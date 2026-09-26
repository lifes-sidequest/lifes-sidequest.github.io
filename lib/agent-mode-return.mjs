export function normalizeAgentPath(value) {
  if (typeof value !== "string") return "/";
  const normalized = value.replace(/\/+$/, "");
  return normalized || "/";
}

export function safeAgentReturnPath(value) {
  const normalized = normalizeAgentPath(value);
  if (!normalized.startsWith("/") || normalized.startsWith("//") || normalized.includes("\\") || normalized === "/for-agents") {
    return "/";
  }
  return normalized;
}
