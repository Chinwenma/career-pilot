"use client";

import { Navbar } from "@/components/dashboard/layout/navbar/Navbar";
import { Sidebar } from "@/components/dashboard/layout/sidebar/Sidebar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto bg-slate-950 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}