export function maskString(str: string) {
  if (str.length <= 2) {
    return str;
  }

  const visible = str.slice(0, 2);
  const masked = "*".repeat(str.length - 2);
  return visible + masked;
}

interface CookieOptions {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const { days = 7, path = "/", secure = false, sameSite = "Lax" } = options;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=${path}; SameSite=${sameSite}`;
  if (secure) cookie += "; secure";

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${encodeURIComponent(name)}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop()!.split(";").shift()!);
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
