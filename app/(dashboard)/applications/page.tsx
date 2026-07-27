import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApplicationsClient } from "@/components/dashboard/applications/ApplicationsClient";

export default async function ApplicationsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  const applications = await prisma.application.findMany({
    where: { userId },
    orderBy: { dateApplied: "desc" },
  });

  return (
    <ApplicationsClient
      initialApplications={applications.map((app) => ({
        id: app.id,
        company: app.company,
        position: app.position,
        status: app.status as "applied" | "interview" | "rejected" | "offer",
        dateApplied: app.dateApplied.toISOString(),
        location: app.location,
        salary: app.salary,
        notes: app.notes,
      }))}
    />
  );
}
