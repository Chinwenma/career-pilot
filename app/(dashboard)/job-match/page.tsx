import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobMatchClient } from "@/components/dashboard/job-match/JobMatchClient";

export default async function JobMatchPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  const cvs = await prisma.cVAnalysis.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, fileName: true, createdAt: true },
  });

  return (
    <JobMatchClient
      cvs={cvs.map((cv) => ({
        id: cv.id,
        fileName: cv.fileName,
        createdAt: cv.createdAt.toISOString(),
      }))}
    />
  );
}
