import Link from "next/link";
import { LogOut } from "lucide-react";
import { FidelityMark } from "@/components/brand/Logo";
import { logout } from "./actions";

export function AdminBar() {
  return (
    <header className="bg-obsidian text-bone">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <FidelityMark className="h-7 w-7" />
          <span className="eyebrow">Fidelity · Leads</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/" className="text-bone/60 hover:text-bone">View site</Link>
          <form action={logout}>
            <button type="submit" className="flex items-center gap-2 text-bone/60 hover:text-bone">
              <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export const statusStyles: Record<string, string> = {
  new: "bg-arch text-bone",
  contacted: "bg-print text-obsidian",
  qualified: "bg-interior text-bone",
  proposal: "bg-champagne text-obsidian",
  won: "bg-obsidian text-bone",
  lost: "bg-stone text-bone",
  archived: "bg-sand text-obsidian",
};
