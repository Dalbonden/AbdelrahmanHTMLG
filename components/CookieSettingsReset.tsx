"use client";

import { CONSENT_KEY } from "@/lib/consent";

export function CookieSettingsReset() {
  function handleReset() {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  }

  return (
    <button
      onClick={handleReset}
      className="mt-3 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
    >
      Återställ cookie-inställningar
    </button>
  );
}
