import { redirect } from "next/navigation";
import { FidelityMark } from "@/components/brand/Logo";
import { adminConfigured, isAdmin } from "@/lib/server/security";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = adminConfigured();
  return (
    <main className="grid min-h-screen place-items-center bg-obsidian px-4 text-bone">
      <div className="w-full max-w-sm">
        <FidelityMark className="h-10 w-10" />
        <h1 className="mt-8 font-display text-3xl font-semibold uppercase tracking-tight">Lead management</h1>
        <p className="mt-2 text-sm text-bone/55">Authorised Fidelity staff only.</p>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="mt-8 border border-dashed border-bone/25 p-4 text-sm leading-relaxed text-bone/70">
            The admin area is disabled. Set <code className="text-champagne-soft">ADMIN_PASSWORD</code> and a 32+ character{" "}
            <code className="text-champagne-soft">ADMIN_SESSION_SECRET</code> in the server environment, then restart.
          </p>
        )}
      </div>
    </main>
  );
}
