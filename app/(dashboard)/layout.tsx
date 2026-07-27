import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/layout/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userName = session?.user?.name ?? "there";

  return <DashboardShell userName={userName}>{children}</DashboardShell>;
}
