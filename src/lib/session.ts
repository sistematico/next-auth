import { z } from "zod";

// Seven days in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "admin"]),
});

type UserSession = z.infer<typeof sessionSchema>;
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    },
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

function encodeSession(session: UserSession) {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

function decodeSession(raw: string | undefined): UserSession | null {
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf8");
    const parsed = JSON.parse(decoded);
    const { success, data } = sessionSchema.safeParse(parsed);
    return success ? data : null;
  } catch {
    return null;
  }
}

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const raw = cookies.get(COOKIE_SESSION_KEY)?.value;
  return decodeSession(raw);
}

export async function updateUserSessionData(cookies: Pick<Cookies, "get">) {
  // Without server-side session store, session data is stored entirely in the cookie.
  return getUserFromSession(cookies);
}

export async function createUserSession(
  user: { id?: number | string; role: string },
  cookies: Pick<Cookies, "set">,
) {
  const sessionId =
    user.id != null ? String(user.id) : await generateRandomId();
  // Coerce/validate role coming from DB (string) into the strict union our session schema expects
  const role = user.role === "admin" ? "admin" : "user";
  const userSession: UserSession = { id: sessionId, role };
  setCookie(userSession, cookies);
  return userSession;
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">,
) {
  const current = getUserFromSession(cookies);
  if (current == null) return null;
  setCookie(current, cookies); // refresh expiration
  return current;
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">,
) {
  const existing = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (existing == null) return null;
  cookies.delete(COOKIE_SESSION_KEY);
  return true;
}

function setCookie(session: UserSession, cookies: Pick<Cookies, "set">) {
  const encoded = encodeSession(session);
  cookies.set(COOKIE_SESSION_KEY, encoded, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function generateRandomId(): Promise<string> {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
