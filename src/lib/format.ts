export function titleCase(s: string) {
  return s
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function sessionLabel(code?: string) {
  if (code === "2") return "(14:00–17:00)";
  return "(11:00–13:00)";
}
