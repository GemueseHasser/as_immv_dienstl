export const SITE_COOKIE_CONSENT_KEY = 'as-site-cookie-consent';

export function hasSiteCookieConsent() {
  try {
    return window.localStorage.getItem(SITE_COOKIE_CONSENT_KEY) === 'accepted';
  } catch (error) {
    return false;
  }
}

export function setSiteCookieConsentAccepted() {
  try {
    window.localStorage.setItem(SITE_COOKIE_CONSENT_KEY, 'accepted');
    window.dispatchEvent(new CustomEvent('as-cookie-consent-changed', { detail: 'accepted' }));
  } catch (error) {
    // ignore storage access issues
  }
}
