import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileClient } from "@/components/dashboard/profile/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  const [user, applicationsCount] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    prisma.application.count({ where: { userId } }),
  ]);

  return (
    <ProfileClient
      initialProfile={{
        name: user.name,
        email: user.email,
        location: user.location ?? "",
        headline: user.headline ?? "",
        bio: user.bio ?? "",
        skills: user.skills,
      }}
      applicationsCount={applicationsCount}
    />
  );
}
