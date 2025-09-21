export function maskString(str: string) {
  if (str.length <= 2) {
    return str;
  }

  const visible = str.slice(0, 2);
  const masked = "*".repeat(str.length - 2);
  return visible + masked;
}
