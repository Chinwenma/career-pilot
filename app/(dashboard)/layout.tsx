"use client";

import { useState } from "react";
import { Navbar } from "@/components/dashboard/layout/navbar/Navbar";
import { Sidebar } from "@/components/dashboard/layout/sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-slate-950 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}