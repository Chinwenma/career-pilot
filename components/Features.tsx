import { FileText, Zap, MessageSquare, Brain, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FileText,
    title: "CV Analysis",
    description: "AI-powered insights on your resume strength",
  },
  {
    icon: Zap,
    title: "ATS Scoring",
    description: "See how recruiters will rank your application",
  },
  {
    icon: MessageSquare,
    title: "Cover Letters",
    description: "Generate personalized cover letters in seconds",
  },
  {
    icon: Brain,
    title: "Interview Prep",
    description: "Practice with AI-generated technical & HR questions",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Everything You Need
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors hover:shadow-lg hover:shadow-blue-500/10"
            >
              <Icon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
