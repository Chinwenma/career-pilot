"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cv-analysis", icon: FileText, label: "CV Analysis" },
  { href: "/job-match", icon: Briefcase, label: "Job Match" },
  { href: "/cover-letter", icon: MessageSquare, label: "Cover Letter" },
  { href: "/applications", icon: ClipboardList, label: "Applications" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white">CareerPilot</h2>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors text-left">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}