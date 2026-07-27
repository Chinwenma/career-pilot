"use client";

import { Bell, Menu, User } from "lucide-react";

interface NavbarProps {
  userName: string;
  onMenuClick: () => void;
}

export function Navbar({ userName, onMenuClick }: NavbarProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-sm text-slate-400">
          Welcome back,{" "}
          <span className="font-semibold text-white">{userName}</span>
        </div>
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