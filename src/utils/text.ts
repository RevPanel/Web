export function capitalize(text: string | string[]) {
  if (Array.isArray(text)) {
    return text.map((t) => t[0].toUpperCase() + t.slice(1)).join(" ");
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
