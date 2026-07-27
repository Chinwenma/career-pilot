"use server";

import { hash } from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { createApprovalToken } from "@/lib/approval-token";
import { sendSignupApprovalRequest } from "@/lib/notify-owner";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export type AuthActionState = {
  error?: string;
  pending?: boolean;
};

export async function login(values: {
  email: string;
  password: string;
}): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid email or password." };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { approvalStatus: true },
  });
  if (existing?.approvalStatus === "PENDING") {
    return { error: "Your account is still awaiting approval." };
  }
  if (existing?.approvalStatus === "REJECTED") {
    return { error: "This account request was not approved." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}

export async function registerUser(values: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check your details and try again." };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const approveUrl = `${appUrl}/api/admin/approve-user?token=${createApprovalToken(user.id, "approve")}`;
  const rejectUrl = `${appUrl}/api/admin/approve-user?token=${createApprovalToken(user.id, "reject")}`;

  await sendSignupApprovalRequest({ name, email, approveUrl, rejectUrl });

  return { pending: true };
}

export async function logout() {
  await signOut({ redirect: false });
  redirect("/login");
}
