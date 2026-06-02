"use client";

// Delat formulär för inloggning och registrering. Använder useActionState
// för att visa serverfel utan att tappa det användaren skrivit.
import { useActionState } from "react";
import Link from "next/link";
import { registerAction, loginAction, type AuthState } from "@/app/actions/auth";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    undefined
  );

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-2xl font-bold">
        {mode === "login" ? "Logga in" : "Skapa konto"}
      </h1>

      <form action={formAction} className="mt-6 space-y-4">
        {mode === "register" && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Namn</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">E-post</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Lösenord</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={mode === "register" ? 8 : undefined}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {mode === "register" && (
            <p className="mt-1 text-xs text-brand-muted">Minst 8 tecken.</p>
          )}
        </div>

        {state?.error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-brand-accent">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-brand px-4 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {pending
            ? "Vänta…"
            : mode === "login"
              ? "Logga in"
              : "Skapa konto"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-brand-muted">
        {mode === "login" ? (
          <>
            Har du inget konto?{" "}
            <Link href="/registrera" className="font-medium text-brand underline">
              Skapa konto
            </Link>
          </>
        ) : (
          <>
            Har du redan ett konto?{" "}
            <Link href="/logga-in" className="font-medium text-brand underline">
              Logga in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
