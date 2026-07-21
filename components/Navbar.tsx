import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">CareerPilot</div>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors">
              Log In
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
