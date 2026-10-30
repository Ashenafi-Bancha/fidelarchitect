import { NextResponse } from "next/server";
import { inquirySchema, fieldErrors, normaliseRaw, UPLOAD_LIMITS } from "@/lib/inquiry-schema";
import { createInquiry } from "@/lib/server/inquiries";
import { clientIp, rateLimit } from "@/lib/server/security";

export const runtime = "nodejs";

const MAX_BODY = UPLOAD_LIMITS.maxFiles * UPLOAD_LIMITS.maxBytes + 256 * 1024;

export async function POST(req: Request) {
  const ip = await clientIp();
  if (!rateLimit(`inq:${ip}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  const len = Number(req.headers.get("content-length") || 0);
  if (len > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "The attachments are too large. Each file must be 5 MB or less." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "We could not read the form. Please try again." }, { status: 400 });
  }

  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string" && k !== "files") raw[k] = v;

  // Honeypot filled: pretend success, store nothing.
  if (raw.website) return NextResponse.json({ ok: true, ref: "FBG-RECEIVED" });

  const parsed = inquirySchema.safeParse(normaliseRaw(raw));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) }, { status: 422 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > UPLOAD_LIMITS.maxFiles) {
    return NextResponse.json({ ok: false, error: `Attach up to ${UPLOAD_LIMITS.maxFiles} files.`, fields: { files: `Attach up to ${UPLOAD_LIMITS.maxFiles} files.` } }, { status: 422 });
  }
  for (const f of files) {
    if (f.size > UPLOAD_LIMITS.maxBytes) {
      return NextResponse.json({ ok: false, error: `"${f.name}" is larger than 5 MB.`, fields: { files: `"${f.name}" is larger than 5 MB.` } }, { status: 422 });
    }
  }

  const { consent: _c, website: _w, ...data } = parsed.data;
  try {
    const result = await createInquiry({ ...data, source: req.headers.get("referer") ?? undefined }, files);
    if ("error" in result) {
      return NextResponse.json({ ok: false, error: result.error, fields: { files: result.error } }, { status: 422 });
    }
    return NextResponse.json({ ok: true, ref: result.ref });
  } catch (e) {
    console.error("[inquiry] failed to store", e);
    return NextResponse.json({ ok: false, error: "Something went wrong on our side. Please try again or contact us directly." }, { status: 500 });
  }
}
