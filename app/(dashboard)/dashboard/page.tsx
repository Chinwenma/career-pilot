import Link from "next/link";
import { BarChart3, ClipboardList, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let value = seconds;
  for (const [amount, unit] of units) {
    if (value < amount) {
      const rounded = Math.floor(value);
      return `${rounded} ${unit}${rounded === 1 ? "" : "s"} ago`;
    }
    value /= amount;
  }
  return "just now";
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  const [cvAnalyses, applications] = await Promise.all([
    prisma.cVAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const avgAtsScore =
    cvAnalyses.length > 0
      ? Math.round(
          cvAnalyses.reduce((sum, a) => sum + (a.atsScore ?? 0), 0) /
            cvAnalyses.length
        )
      : null;

  const stats = [
    {
      icon: BarChart3,
      label: "CVs Analyzed",
      value: String(cvAnalyses.length),
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      label: "Average ATS Score",
      value: avgAtsScore !== null ? `${avgAtsScore}%` : "—",
      color: "text-green-400",
    },
    {
      icon: ClipboardList,
      label: "Applications",
      value: String(applications.length),
      color: "text-orange-400",
    },
  ];

  const recentActivity = [
    ...applications.map((application) => ({
      action: `Application ${application.status}`,
      company: application.company,
      date: application.createdAt,
    })),
    ...cvAnalyses.map((analysis) => ({
      action: "CV analyzed",
      company: analysis.fileName,
      date: analysis.createdAt,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Here's an overview of your job search progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <Icon className={`w-8 h-8 ${stat.color} mb-4`} />
              <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/cv-analysis">
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Upload CV
            </button>
          </Link>
          <Link href="/job-match">
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Analyze Job
            </button>
          </Link>
          <Link href="/cover-letter">
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Generate Cover Letter
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-white font-medium">{item.action}</p>
                    <p className="text-slate-400 text-sm">{item.company}</p>
                  </div>
                  <p className="text-slate-500 text-sm">
                    {timeAgo(item.date)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-4">
              No activity yet. Upload a CV or track your first application to
              get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
