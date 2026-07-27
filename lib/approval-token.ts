import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

type ApprovalAction = "approve" | "reject";

function getSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set.");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createApprovalToken(
  userId: string,
  action: ApprovalAction
): string {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${userId}.${action}.${expiresAt}`;
  const signature = sign(payload);
  return Buffer.from(payload).toString("base64url") + "." + signature;
}

export function verifyApprovalToken(
  token: string
): { userId: string; action: ApprovalAction } | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  const expectedSignature = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const [userId, action, expiresAtRaw] = payload.split(".");
  if (!userId || (action !== "approve" && action !== "reject")) return null;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return { userId, action };
}
