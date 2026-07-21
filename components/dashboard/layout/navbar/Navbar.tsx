"use client";

import { Bell, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-8 h-16 flex items-center justify-between">
      <div className="text-sm text-slate-400">
        Welcome back, <span className="font-semibold text-white">Chinwe</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}