"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().optional(),
  headline: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()),
});

export type ProfileActionState = {
  error?: string;
};

export async function updateProfile(values: {
  name: string;
  location?: string;
  headline?: string;
  bio?: string;
  skills: string[];
}): Promise<ProfileActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in." };
  }

  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check your profile details." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
  });

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return {};
}
