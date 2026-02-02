/**
 * Token storage (localStorage / sessionStorage).
 *
 * SECURITY TRADEOFF: Tokens stored here are readable by any JavaScript on the
 * same origin. A successful XSS attack can steal them. Prefer httpOnly cookies
 * for the access token when the backend supports it (Set-Cookie on login/refresh,
 * API accepts Cookie header).
 *
 * If keeping this approach:
 * - Configure strict Content-Security-Policy (CSP) headers to reduce XSS risk.
 * - Sanitize user content; avoid dangerouslySetInnerHTML with untrusted data.
 * - Use sessionStorage when "remember me" is unchecked so tokens clear on tab close.
 */

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REMEMBER_KEY,
} from "@/constants";

function getStorage(persistent: boolean): Storage {
  return persistent ? localStorage : sessionStorage;
}

function isPersistent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(REMEMBER_KEY) === "true";
}

function get(key: string): string | null {
  if (typeof window === "undefined") return null;
  const storage = isPersistent() ? localStorage : sessionStorage;
  return storage.getItem(key);
}

function set(key: string, value: string, persistent: boolean): void {
  if (typeof window === "undefined") return;
  const storage = getStorage(persistent);
  storage.setItem(key, value);
  if (persistent) {
    localStorage.setItem(REMEMBER_KEY, "true");
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}

export const tokenStorage = {
  getAccessToken: () => get(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string, persistent = true) =>
    set(ACCESS_TOKEN_KEY, token, persistent),
  getRefreshToken: () => get(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string, persistent = true) =>
    set(REFRESH_TOKEN_KEY, token, persistent),
  clear: () => {
    remove(ACCESS_TOKEN_KEY);
    remove(REFRESH_TOKEN_KEY);
    remove(REMEMBER_KEY);
  },
};
