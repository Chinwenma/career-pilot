import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Land Your Dream Job
          <span className="text-blue-400"> With AI</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          CareerPilot uses advanced AI to optimize your CV, match job
          descriptions, generate cover letters, and prepare you for
          interviews.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <button className="px-8 py-3 border border-slate-600 text-white hover:bg-slate-800 rounded-lg font-medium transition-colors">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}
