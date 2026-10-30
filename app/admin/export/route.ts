import { isAdmin } from "@/lib/server/security";
import { listInquiries } from "@/lib/server/inquiries";

export const dynamic = "force-dynamic";

// Prefix cells that spreadsheet apps would treat as formulas.
function cell(v: unknown) {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const { searchParams } = new URL(req.url);
  const division = searchParams.get("division");
  const status = searchParams.get("status");
  const list = (await listInquiries()).filter((i) => (!division || i.division === division) && (!status || i.status === status));
  const cols = ["ref", "createdAt", "status", "assignee", "name", "organization", "phone", "email", "contactMethod", "division", "location", "budget", "timeline", "description", "notes", "attachments"] as const;
  const lines = [cols.join(",")];
  for (const i of list) {
    const row: Record<(typeof cols)[number], unknown> = {
      ...i,
      notes: i.notes.map((n) => `${n.at}: ${n.text}`).join(" | "),
      attachments: i.files.length,
    } as never;
    lines.push(cols.map((c) => cell(row[c])).join(","));
  }
  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fidelity-inquiries-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
