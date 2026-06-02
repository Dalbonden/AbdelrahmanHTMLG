// Hanterar cookie-samtyckespreferenser.
// Samtycke sparas i localStorage (ej cookie) för att inte kräva samtycke
// för att lagra samtycket självt — förenligt med GDPR art. 7 + ePrivacy.

export type ConsentState = {
  necessary: true;       // Alltid på — tekniskt nödvändigt
  analytics: boolean;    // Google Analytics, Plausible m.m.
  marketing: boolean;    // Retargeting, Facebook Pixel m.m.
  decided: boolean;      // Har användaren tagit ett aktivt beslut?
  timestamp: number;
};

export const CONSENT_KEY = "shopen_cookie_consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    decided: true,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  return state;
}

export function acceptAll(): ConsentState {
  return saveConsent(true, true);
}

export function rejectAll(): ConsentState {
  return saveConsent(false, false);
}
