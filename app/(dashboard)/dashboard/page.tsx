"use client";

import Link from "next/link";
import { BarChart3, Zap, MessageSquare, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      icon: BarChart3,
      label: "CVs Analyzed",
      value: "3",
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      label: "Average ATS Score",
      value: "78%",
      color: "text-green-400",
    },
    {
      icon: MessageSquare,
      label: "Cover Letters",
      value: "5",
      color: "text-purple-400",
    },
    {
      icon: Zap,
      label: "Applications",
      value: "8",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Here's an overview of your job search progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="space-y-4">
            {[
              {
                action: "CV analyzed",
                company: "Langdock",
                time: "2 hours ago",
              },
              {
                action: "Cover letter generated",
                company: "JustWatch",
                time: "1 day ago",
              },
              {
                action: "Application submitted",
                company: "GAIA",
                time: "3 days ago",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0"
              >
                <div>
                  <p className="text-white font-medium">{item.action}</p>
                  <p className="text-slate-400 text-sm">{item.company}</p>
                </div>
                <p className="text-slate-500 text-sm">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}