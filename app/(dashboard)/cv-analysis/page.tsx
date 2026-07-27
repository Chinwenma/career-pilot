import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CvAnalysisClient } from "@/components/dashboard/cv-analysis/CvAnalysisClient";

export default async function CVAnalysisPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  const latest = await prisma.cVAnalysis.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <CvAnalysisClient
      initialAnalysis={
        latest
          ? {
              fileName: latest.fileName,
              score: latest.atsScore ?? 0,
              strengths: latest.strengths,
              weaknesses: latest.weaknesses,
              missingSkills: latest.missingSkills,
              suggestions: latest.suggestions,
            }
          : null
      }
    />
  );
}
