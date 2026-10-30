import { promises as fs } from "node:fs";
import { isAdmin } from "@/lib/server/security";
import { filePath, getInquiry } from "@/lib/server/inquiries";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string; file: string }> }) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const { id, file } = await params;
  const inquiry = await getInquiry(id);
  const meta = inquiry?.files.find((f) => f.storedAs === file);
  const p = meta && filePath(id, file);
  if (!meta || !p) return new Response("Not found", { status: 404 });
  const data = await fs.readFile(p);
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": meta.type,
      "Content-Disposition": `inline; filename="${encodeURIComponent(meta.name)}"`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox",
      "Cache-Control": "private, no-store",
    },
  });
}
