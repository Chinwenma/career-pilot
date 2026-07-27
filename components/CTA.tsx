import Link from "next/link";

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
      <Link href="/register">
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
          Sign Up Now
        </button>
      </Link>
    </section>
  );
}