import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

function get(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function set(key: string, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

export const tokenStorage = {
  getAccessToken: () => get(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string) => set(ACCESS_TOKEN_KEY, token),
  getRefreshToken: () => get(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => set(REFRESH_TOKEN_KEY, token),
  clear: () => {
    remove(ACCESS_TOKEN_KEY);
    remove(REFRESH_TOKEN_KEY);
  },
};
