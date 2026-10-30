import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, Paperclip } from "lucide-react";
import { isAdmin } from "@/lib/server/security";
import { listInquiries, STATUSES } from "@/lib/server/inquiries";
import { divisionOptions } from "@/lib/inquiry-schema";
import { AdminBar, statusStyles } from "./AdminBar";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const divisionLabel = Object.fromEntries(divisionOptions.map((d) => [d.value, d.label]));

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ division?: string; status?: string; q?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { division, status, q } = await searchParams;
  const all = await listInquiries();
  const needle = q?.trim().toLowerCase();
  const list = all.filter(
    (i) =>
      (!division || i.division === division) &&
      (!status || i.status === status) &&
      (!needle || [i.name, i.phone, i.email, i.organization, i.location, i.ref].some((v) => v?.toLowerCase().includes(needle))),
  );
  const counts = Object.fromEntries(STATUSES.map((s) => [s, all.filter((i) => i.status === s).length]));
  const exportQs = new URLSearchParams(Object.entries({ division, status, q }).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">Project inquiries</h1>
            <p className="mt-1 text-sm text-obsidian/60">{all.length} total · {counts.new} new</p>
          </div>
          <a href={`/admin/export${exportQs ? `?${exportQs}` : ""}`} className="inline-flex h-10 items-center gap-2 border border-obsidian/25 px-4 text-sm hover:bg-obsidian hover:text-bone">
            <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
          </a>
        </div>

        <form className="mt-8 grid gap-3 border border-obsidian/10 bg-bone p-4 sm:grid-cols-4" role="search">
          <label className="sm:col-span-2">
            <span className="sr-only">Search</span>
            <input name="q" defaultValue={q} placeholder="Search name, phone, email, location, reference…" className="h-10 w-full border border-obsidian/20 bg-white px-3 text-sm" />
          </label>
          <label>
            <span className="sr-only">Division</span>
            <select name="division" defaultValue={division ?? ""} className="h-10 w-full border border-obsidian/20 bg-white px-3 text-sm">
              <option value="">All divisions</option>
              {divisionOptions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </label>
          <div className="flex gap-2">
            <label className="flex-1">
              <span className="sr-only">Status</span>
              <select name="status" defaultValue={status ?? ""} className="h-10 w-full border border-obsidian/20 bg-white px-3 text-sm">
                <option value="">All statuses</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s} ({counts[s]})</option>)}
              </select>
            </label>
            <button type="submit" className="h-10 bg-obsidian px-4 text-sm text-bone">Filter</button>
          </div>
        </form>

        {list.length === 0 ? (
          <div className="mt-8 border border-dashed border-obsidian/20 p-16 text-center">
            <p className="font-display text-xl font-semibold uppercase">No inquiries {all.length ? "match these filters" : "yet"}</p>
            <p className="mt-2 text-sm text-obsidian/55">New submissions from the website appear here instantly.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto border border-obsidian/10 bg-bone">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-obsidian/10 text-xs uppercase tracking-[0.12em] text-obsidian/50">
                <tr>
                  <th className="p-4 font-medium">Received</th>
                  <th className="p-4 font-medium">Client</th>
                  <th className="p-4 font-medium">Division</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Assignee</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((i) => (
                  <tr key={i.id} className="border-b border-obsidian/5 hover:bg-linen">
                    <td className="p-4 whitespace-nowrap text-obsidian/60">
                      {new Date(i.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      <div className="font-mono text-[0.7rem]">{i.ref}</div>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/inquiries/${i.id}`} className="font-medium underline-offset-4 hover:underline">{i.name}</Link>
                      <div className="text-xs text-obsidian/55">{i.organization ?? i.phone}</div>
                    </td>
                    <td className="p-4">{divisionLabel[i.division]}</td>
                    <td className="p-4">
                      {i.location}
                      {i.files.length > 0 && <Paperclip className="ml-2 inline h-3.5 w-3.5 text-obsidian/40" aria-label={`${i.files.length} attachments`} />}
                    </td>
                    <td className="p-4 text-obsidian/70">{i.assignee ?? "—"}</td>
                    <td className="p-4">
                      <span className={cn("inline-block px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em]", statusStyles[i.status])}>{i.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
