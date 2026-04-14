const API_BASE = process.env.REACT_APP_API_BASE || '/api';

export function getToken() {
  return localStorage.getItem('as_token') || '';
}

export function setSession(token, user) {
  if (token) localStorage.setItem('as_token', token);
  if (user) localStorage.setItem('as_user', JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem('as_token');
  localStorage.removeItem('as_user');
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('as_user') || 'null');
  } catch {
    return null;
  }
}

export function assetUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return path;
}

export async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  if (token && !headers.Authorization) headers.Authorization = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.message || 'Anfrage fehlgeschlagen.');
  }
  return payload;
}
