import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ContactModal from './components/ContactModal';
import CookieConsentBanner from './components/CookieConsentBanner';
import InstagramEmbed from './components/InstagramEmbed';
import { CONSENT_MAX_AGE, SITE_COOKIE_CONSENT_KEY, openCookieSettings, setInstagramConsent } from './utils/consent';
let container, root;
beforeEach(() => {
  localStorage.clear();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});
function render(path = '/') {
  act(() => root.render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CookieConsentBanner />
      <InstagramEmbed embedUrl="https://www.instagram.com/bagger_extreme/embed" title="Instagram" />
    </MemoryRouter>
  ));
}
function click(label) {
  const button = Array.from(document.querySelectorAll('button')).find(b => b.textContent === label);
  expect(button).toBeDefined();
  act(() => button.click());
}

test('no iframe before consent; reject persists; reopening alone never grants consent', () => {
  render();
  expect(container.querySelector('iframe')).toBeNull();
  click('Alle ablehnen');
  expect(container.querySelector('.privacy-banner')).toBeNull();
  expect(container.querySelector('iframe')).toBeNull();
  act(() => openCookieSettings());
  expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  expect(container.querySelector('iframe')).toBeNull();
  click('Ohne Änderung schließen');
  expect(JSON.parse(localStorage.getItem(SITE_COOKIE_CONSENT_KEY)).instagram).toBe(false);
});

test('explicit acceptance mounts iframe; withdrawal removes it immediately', () => {
  render();
  click('Instagram erlauben');
  expect(container.querySelector('iframe').getAttribute('referrerpolicy')).toBe('no-referrer');
  click('Instagram deaktivieren / Einwilligung widerrufen');
  expect(container.querySelector('iframe')).toBeNull();
  expect(JSON.parse(localStorage.getItem(SITE_COOKIE_CONSENT_KEY)).instagram).toBe(false);
});

test('cross-tab withdrawal removes an already mounted iframe', () => {
  render();
  click('Instagram erlauben');
  const choice = JSON.parse(localStorage.getItem(SITE_COOKIE_CONSENT_KEY));
  localStorage.setItem(SITE_COOKIE_CONSENT_KEY, JSON.stringify({ ...choice, instagram: false }));
  act(() => window.dispatchEvent(new StorageEvent('storage', { key: SITE_COOKIE_CONSENT_KEY })));
  expect(container.querySelector('iframe')).toBeNull();
});

test('expiration removes iframe without reloading', () => {
  jest.useFakeTimers();
  const now = Date.now();
  localStorage.setItem(SITE_COOKIE_CONSENT_KEY, JSON.stringify({ version: 2, instagram: true,
    savedAt: now - CONSENT_MAX_AGE + 1000, expiresAt: now + 1000 }));
  render();
  expect(container.querySelector('iframe')).not.toBeNull();
  act(() => jest.advanceTimersByTime(1002));
  expect(container.querySelector('iframe')).toBeNull();
  expect(container.querySelector('.privacy-banner')).not.toBeNull();
});

test('legal page is accessible without a banner or consent', () => {
  render('/datenschutz');
  expect(container.querySelector('.privacy-banner')).toBeNull();
  expect(container.querySelector('iframe')).toBeNull();
  act(() => setInstagramConsent(false));
});


test('contact request needs no Instagram consent or phone number', async () => {
  const oldFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, message: 'Test erfolgreich' }) });
  try {
    act(() => root.render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ContactModal open onClose={() => {}} initialCategory="immobilienverwaltung" />
    </MemoryRouter>));
    const fill = (selector, value, prototype) => {
      const field = document.querySelector(selector);
      act(() => {
        Object.getOwnPropertyDescriptor(prototype, 'value').set.call(field, value);
        field.dispatchEvent(new Event('input', { bubbles: true }));
      });
    };
    fill('input[name="email"]', 'test@example.org', HTMLInputElement.prototype);
    fill('textarea[name="message"]', 'Eine ausreichend lange Testanfrage.', HTMLTextAreaElement.prototype);
    expect(document.querySelector('input[type="checkbox"]')).toBeNull();
    await act(async () => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][1]).toMatchObject({ mode: 'same-origin',
      credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer' });
    const payload = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(payload.phone).toBe('');
    expect(payload.consent).toBeUndefined();
    expect(localStorage.getItem(SITE_COOKIE_CONSENT_KEY)).toBeNull();
  } finally {
    global.fetch = oldFetch;
  }
});
