"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SKILL_POOL = [
  "Docker",
  "AWS / Cloud Architecture",
  "GraphQL",
  "Kubernetes",
  "Testing (Jest/RTL)",
  "CI/CD",
];

/**
 * Scores are deterministically derived from the file name since there is no
 * real CV-parsing/AI pipeline wired up yet. Replace with a real analyzer
 * when one is available.
 */
export async function analyzeCv(fileName: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const seed = fileName
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const atsScore = 60 + (seed % 36);

  const analysis = await prisma.cVAnalysis.create({
    data: {
      userId: session.user.id,
      fileName,
      atsScore,
      strengths: [
        "Clear, chronological work history",
        "Good use of action verbs and metrics",
      ],
      weaknesses: [
        "Missing quantifiable achievements in some roles",
        "No professional summary at the top",
      ],
      missingSkills: SKILL_POOL.slice(0, 3 + (seed % 3)),
      suggestions: [
        "Add measurable impact to each role, e.g. performance improvements.",
        "Include a professional summary at the top of the CV.",
        "Mirror 2-3 keywords from your target job descriptions.",
      ],
    },
  });

  revalidatePath("/cv-analysis");
  revalidatePath("/dashboard");
  revalidatePath("/job-match");

  return analysis;
}
