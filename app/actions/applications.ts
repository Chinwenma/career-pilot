"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum(["applied", "interview", "rejected", "offer"]),
  location: z.string().optional(),
  salary: z.string().optional(),
  notes: z.string().optional(),
});

export type ApplicationActionState = {
  error?: string;
};

export async function createApplication(values: {
  company: string;
  position: string;
  status: string;
  location?: string;
  salary?: string;
  notes?: string;
}): Promise<ApplicationActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in." };
  }

  const parsed = applicationSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check the application details." };
  }

  await prisma.application.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  revalidatePath("/applications");
  revalidatePath("/dashboard");
  return {};
}

export async function deleteApplication(id: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) {
    return;
  }

  await prisma.application.deleteMany({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/applications");
  revalidatePath("/dashboard");
}
