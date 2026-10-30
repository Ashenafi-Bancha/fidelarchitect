import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, FileText, MessageCircle, Phone, Mail } from "lucide-react";
import { isAdmin } from "@/lib/server/security";
import { getInquiry, STATUSES } from "@/lib/server/inquiries";
import { divisionOptions, contactMethodOptions } from "@/lib/inquiry-schema";
import { AdminBar, statusStyles } from "../../AdminBar";
import { updateLead } from "../../actions";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const fmt = (d: string) => new Date(d).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

export default async function InquiryDetail({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const i = await getInquiry((await params).id);
  if (!i) notFound();

  const digits = i.phone.replace(/[^\d]/g, "");
  const rows: [string, React.ReactNode][] = [
    ["Reference", <span key="r" className="font-mono">{i.ref}</span>],
    ["Received", fmt(i.createdAt)],
    ["Name", i.name],
    ["Organisation", i.organization ?? "—"],
    ["Phone", i.phone],
    ["Email", i.email ?? "—"],
    ["Preferred contact", contactMethodOptions.find((c) => c.value === i.contactMethod)?.label],
    ["Division", divisionOptions.find((d) => d.value === i.division)?.label],
    ["Location", i.location],
    ["Budget", i.budget ?? "—"],
    ["Timeline", i.timeline ?? "—"],
  ];

  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-obsidian/60 hover:text-obsidian">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All inquiries
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">{i.name}</h1>
          <span className={cn("px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em]", statusStyles[i.status])}>{i.status}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <a href={`tel:${i.phone.replace(/[^\d+]/g, "")}`} className="inline-flex h-10 items-center gap-2 border border-obsidian/25 px-4 hover:bg-obsidian hover:text-bone">
            <Phone className="h-4 w-4" aria-hidden="true" /> Call
          </a>
          <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-obsidian/25 px-4 hover:bg-obsidian hover:text-bone">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
          {i.email && (
            <a href={`mailto:${i.email}?subject=${encodeURIComponent(`Your inquiry ${i.ref} — Fidelity Business Group`)}`} className="inline-flex h-10 items-center gap-2 border border-obsidian/25 px-4 hover:bg-obsidian hover:text-bone">
              <Mail className="h-4 w-4" aria-hidden="true" /> Email
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="space-y-8 lg:col-span-2">
            <div className="border border-obsidian/10 bg-bone p-6">
              <h2 className="eyebrow text-obsidian/50">Project description</h2>
              <p className="mt-4 whitespace-pre-wrap leading-relaxed">{i.description}</p>
            </div>
            <dl className="grid border border-obsidian/10 bg-bone sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k} className="border-b border-obsidian/5 p-4">
                  <dt className="text-xs uppercase tracking-[0.12em] text-obsidian/45">{k}</dt>
                  <dd className="mt-1 break-words">{v}</dd>
                </div>
              ))}
            </dl>
            {i.files.length > 0 && (
              <div className="border border-obsidian/10 bg-bone p-6">
                <h2 className="eyebrow text-obsidian/50">Attachments</h2>
                <ul className="mt-4 space-y-2">
                  {i.files.map((f) => (
                    <li key={f.id}>
                      <a href={`/admin/files/${i.id}/${f.storedAs}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline">
                        <FileText className="h-4 w-4" aria-hidden="true" /> {f.name}
                        <span className="text-obsidian/45">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <aside className="space-y-8">
            <form key={i.updatedAt} action={updateLead} className="space-y-4 border border-obsidian/10 bg-bone p-6">
              <h2 className="eyebrow text-obsidian/50">Status & assignment</h2>
              <input type="hidden" name="id" value={i.id} />
              <label className="block text-sm">
                Status
                <select name="status" defaultValue={i.status} className="mt-1 h-10 w-full border border-obsidian/20 bg-white px-3">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <label className="block text-sm">
                Assigned to
                <input name="assignee" defaultValue={i.assignee ?? ""} placeholder="Staff member" className="mt-1 h-10 w-full border border-obsidian/20 bg-white px-3" />
              </label>
              <button type="submit" className="h-10 w-full bg-obsidian text-sm text-bone">Save</button>
            </form>

            <div className="border border-obsidian/10 bg-bone p-6">
              <h2 className="eyebrow text-obsidian/50">Follow-up notes</h2>
              {i.notes.length === 0 ? (
                <p className="mt-4 text-sm text-obsidian/50">No notes yet.</p>
              ) : (
                <ol className="mt-4 space-y-4">
                  {[...i.notes].reverse().map((n) => (
                    <li key={n.at} className="border-l-2 border-champagne pl-3 text-sm">
                      <p className="text-xs text-obsidian/45">{fmt(n.at)}</p>
                      <p className="mt-1 whitespace-pre-wrap">{n.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              <form action={updateLead} className="mt-6 space-y-3">
                <input type="hidden" name="id" value={i.id} />
                <label className="sr-only" htmlFor="note">New note</label>
                <textarea id="note" name="note" rows={3} required placeholder="Called client, site visit booked…" className="w-full border border-obsidian/20 bg-white p-3 text-sm" />
                <button type="submit" className="h-10 w-full border border-obsidian/25 text-sm hover:bg-obsidian hover:text-bone">Add note</button>
              </form>
            </div>
            <p className="text-xs text-obsidian/45">Last updated {fmt(i.updatedAt)}</p>
          </aside>
        </div>
      </main>
    </>
  );
}
