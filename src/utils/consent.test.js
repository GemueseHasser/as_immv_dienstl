let consent;
beforeEach(() => {
  jest.resetModules();
  window.localStorage.clear();
  consent = require('./consent');
});
afterEach(() => jest.restoreAllMocks());

test('missing, legacy, malformed, wrong version and expired choices do not allow embeds', () => {
  const now = Date.now();
  const invalid = ['accepted', '{}', '{', JSON.stringify({ version: 1, instagram: true }),
    JSON.stringify({ version: 2, instagram: true, savedAt: now - consent.CONSENT_MAX_AGE - 1, expiresAt: now - 1 }),
    JSON.stringify({ version: 2, instagram: 'true', savedAt: now, expiresAt: now + consent.CONSENT_MAX_AGE })];
  expect(consent.getConsent()).toBeNull();
  invalid.forEach(value => {
    localStorage.setItem(consent.SITE_COOKIE_CONSENT_KEY, value);
    expect(consent.getConsent()).toBeNull();
  });
});

test('acceptance and rejection persist with a bounded lifetime', () => {
  [true, false].forEach(value => {
    consent.setInstagramConsent(value);
    const choice = consent.getConsent();
    expect(choice.instagram).toBe(value);
    expect(choice.expiresAt - choice.savedAt).toBe(consent.CONSENT_MAX_AGE);
    expect(JSON.parse(localStorage.getItem(consent.SITE_COOKIE_CONSENT_KEY))).toEqual(choice);
  });
});

test('blocked storage still allows acceptance and withdrawal in the current page', () => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  const changed = jest.fn();
  const unsubscribe = consent.subscribeConsent(changed);
  consent.setInstagramConsent(true);
  expect(consent.getConsent().instagram).toBe(true);
  consent.setInstagramConsent(false);
  expect(consent.getConsent().instagram).toBe(false);
  expect(changed).toHaveBeenCalledTimes(2);
  unsubscribe();
});

test('only changes to consent or storage clearing trigger synchronization', () => {
  const changed = jest.fn();
  const unsubscribe = consent.subscribeConsent(changed);
  window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated' }));
  expect(changed).not.toHaveBeenCalled();
  window.dispatchEvent(new StorageEvent('storage', { key: consent.SITE_COOKIE_CONSENT_KEY }));
  window.dispatchEvent(new StorageEvent('storage', { key: null }));
  expect(changed).toHaveBeenCalledTimes(2);
  unsubscribe();
});
