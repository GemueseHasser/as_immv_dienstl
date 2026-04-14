import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch, clearSession, getStoredUser, getToken, setSession } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    apiFetch('/auth/me')
      .then((payload) => setUser(payload.user))
      .catch(() => {
        clearSession();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    async login(email, password) {
      const payload = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setSession(payload.token, payload.user);
      setUser(payload.user);
      return payload.user;
    },
    async register(name, email, password) {
      const payload = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      setSession(payload.token, payload.user);
      setUser(payload.user);
      return payload.user;
    },
    logout() {
      clearSession();
      setUser(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
