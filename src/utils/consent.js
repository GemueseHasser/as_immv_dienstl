export const SITE_COOKIE_CONSENT_KEY = 'as-site-cookie-consent';
export const CONSENT_VERSION = 2;
// Product policy, not a statutory six-month deadline.
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_CHANGED = 'as-cookie-consent-changed';
export const CONSENT_SETTINGS = 'as-cookie-settings-open';
let memoryChoice;

function validate(choice) {
  const now = Date.now();
  return choice && choice.version === CONSENT_VERSION &&
    typeof choice.instagram === 'boolean' &&
    Number.isSafeInteger(choice.savedAt) && Number.isSafeInteger(choice.expiresAt) &&
    choice.savedAt > 0 && choice.savedAt <= now && choice.expiresAt > now &&
    choice.expiresAt - choice.savedAt === CONSENT_MAX_AGE ? choice : null;
}

export function getConsent() {
  if (memoryChoice !== undefined) return validate(memoryChoice);
  try {
    // Legacy "accepted" is deliberately not treated as informed consent.
    return validate(JSON.parse(window.localStorage.getItem(SITE_COOKIE_CONSENT_KEY)));
  } catch {
    return null;
  }
}

export function setInstagramConsent(instagram) {
  const savedAt = Date.now();
  const choice = { version: CONSENT_VERSION, instagram: instagram === true,
    savedAt, expiresAt: savedAt + CONSENT_MAX_AGE };
  memoryChoice = choice;
  try {
    window.localStorage.setItem(SITE_COOKIE_CONSENT_KEY, JSON.stringify(choice));
    memoryChoice = undefined;
  } catch {
    // Keep this page usable when storage is blocked; do not lose a withdrawal.
    try { window.localStorage.removeItem(SITE_COOKIE_CONSENT_KEY); } catch { /* blocked */ }
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED));
}

export function subscribeConsent(listener) {
  const onStorage = (event) => {
    if (event.key === SITE_COOKIE_CONSENT_KEY || event.key === null) {
      memoryChoice = undefined;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CONSENT_CHANGED, listener);
  window.addEventListener('focus', listener);
  document.addEventListener('visibilitychange', listener);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CONSENT_CHANGED, listener);
    window.removeEventListener('focus', listener);
    document.removeEventListener('visibilitychange', listener);
  };
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS));
}
