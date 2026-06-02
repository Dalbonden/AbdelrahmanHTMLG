"use client";

// Cookie-banner enligt ePrivacy-direktivet och GDPR art. 7.
// Visas tills användaren tar ett aktivt beslut (opt-in, inte förifyllt).
// Lika enkelt att avvisa som att acceptera (Planet49-domen).

import { useState, useEffect } from "react";
import Link from "next/link";
import { getConsent, acceptAll, rejectAll, saveConsent, type ConsentState } from "@/lib/consent";

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null | "loading">("loading");
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setConsent(getConsent());
  }, []);

  // Visa ingenting under SSR eller om beslut redan fattats
  if (consent === "loading") return null;
  if (consent?.decided) return null;

  function handleAcceptAll() {
    setConsent(acceptAll());
  }

  function handleRejectAll() {
    setConsent(rejectAll());
  }

  function handleSaveCustom() {
    setConsent(saveConsent(analytics, marketing));
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-inställningar"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-2xl sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-xl sm:border"
    >
      <div className="p-5">
        <h2 className="text-base font-bold">Vi använder cookies 🍪</h2>
        <p className="mt-2 text-sm text-brand-muted">
          Vi använder nödvändiga cookies för att butiken ska fungera. Med ditt
          samtycke använder vi även cookies för analys och marknadsföring. Du
          kan när som helst ändra dina val under{" "}
          <Link href="/cookies" className="underline hover:text-brand">
            Cookiepolicy
          </Link>
          .
        </p>

        {showDetails && (
          <div className="mt-4 space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
            <label className="flex items-center justify-between gap-3">
              <span>
                <span className="font-medium">Nödvändiga</span>
                <span className="ml-1 text-xs text-brand-muted">(alltid på)</span>
              </span>
              <input type="checkbox" checked disabled className="h-4 w-4 cursor-not-allowed opacity-50" />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-medium">Analys</span>
                <span className="ml-1 text-xs text-brand-muted">Förbättrar webbplatsen</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-brand"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-medium">Marknadsföring</span>
                <span className="ml-1 text-xs text-brand-muted">Anpassade annonser</span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-brand"
              />
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Acceptera alla
          </button>
          <button
            onClick={handleRejectAll}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
          >
            Avvisa alla
          </button>
        </div>

        <div className="mt-2 flex justify-between text-xs text-brand-muted">
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="underline hover:text-brand"
          >
            {showDetails ? "Dölj detaljer" : "Anpassa val"}
          </button>
          {showDetails && (
            <button
              onClick={handleSaveCustom}
              className="font-medium underline hover:text-brand"
            >
              Spara mina val
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
