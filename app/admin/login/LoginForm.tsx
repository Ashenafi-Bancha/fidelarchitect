"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "../actions";
import { buttonClass } from "@/components/ui/Button";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-10 space-y-6">
      <div>
        <label htmlFor="password" className="eyebrow text-bone/60">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-3 w-full border-0 border-b border-bone/30 bg-transparent px-0 py-3 text-bone focus:border-bone focus:outline-none focus:ring-0"
          aria-invalid={!!state?.error}
          aria-describedby={state?.error ? "login-error" : undefined}
        />
        {state?.error && <p id="login-error" role="alert" className="mt-2 text-sm text-[#ff8a7a]">{state.error}</p>}
      </div>
      <button type="submit" disabled={pending} className={buttonClass("light", "lg", "w-full")}>
        <span>{pending ? "Signing in…" : "Sign in"}</span>
        {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      </button>
    </form>
  );
}
