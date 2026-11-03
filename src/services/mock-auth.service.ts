export interface DemoUser {
  fullName: string;
  email: string;
  companyName: string;
}

const SESSION_KEY = "leaselens:demo-session";
const SESSION_PROFILES_KEY = "leaselens:demo-profiles";

function isDemoUser(value: unknown): value is DemoUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<DemoUser>;
  return typeof user.fullName === "string" && typeof user.email === "string" && typeof user.companyName === "string";
}

function readProfiles(): DemoUser[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(SESSION_PROFILES_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter(isDemoUser) : [];
  } catch {
    return [];
  }
}

export function readDemoSession(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const user: unknown = JSON.parse(stored);
    return isDemoUser(user) ? user : null;
  } catch {
    return null;
  }
}

function displayNameFromEmail(email: string) {
  const localPart = email.split("@")[0] ?? "";
  const words = localPart.split(/[._-]+/).filter(Boolean);
  const name = words.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
  return name || "LeaseLens User";
}

export function findOrCreateDemoUser(email: string): DemoUser {
  const normalizedEmail = email.trim().toLowerCase();
  return readProfiles().find((profile) => profile.email.toLowerCase() === normalizedEmail) ?? {
    fullName: displayNameFromEmail(normalizedEmail),
    email: normalizedEmail,
    companyName: "LeaseLens Demo Workspace",
  };
}

export function saveDemoProfile(user: DemoUser) {
  if (typeof window === "undefined") return;
  try {
    const profiles = readProfiles().filter((profile) => profile.email.toLowerCase() !== user.email.toLowerCase());
    window.localStorage.setItem(SESSION_PROFILES_KEY, JSON.stringify([...profiles, user]));
  } catch {
    // The active in-memory preview session still works if browser storage is unavailable.
  }
}

export function saveDemoSession(user: DemoUser, remember = true) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    const storage = remember ? window.localStorage : window.sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // The auth provider keeps the user in memory for the current page session.
  }
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Clear the in-memory user regardless of browser storage availability.
  }
}
