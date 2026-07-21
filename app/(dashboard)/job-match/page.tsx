"use client";

import { useState } from "react";
import { Briefcase, CheckCircle, AlertCircle, Zap } from "lucide-react";

type JobMatchResult = {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendedKeywords: string[];
  suggestions: string[];
};

export default function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  // Mock job match result
  const mockMatchResult: JobMatchResult = {
    matchPercentage: 72,
    matchingSkills: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "CSS",
      "Git",
    ],
    missingSkills: ["Docker", "AWS", "GraphQL", "Kubernetes", "Redis"],
    recommendedKeywords: [
      "Full-stack Developer",
      "SaaS",
      "Agile",
      "REST API",
      "Database Design",
      "UI/UX",
    ],
    suggestions: [
      "72% match is good! Focus on learning Docker to increase compatibility.",
      "Highlight your React & Next.js experience prominently.",
      "Add projects that demonstrate full-stack capabilities.",
      "Mention any cloud experience, even if not AWS.",
      "Include metrics in your achievements (performance improvements, user growth).",
    ],
  };

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert("Please paste a job description");
      return;
    }

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setMatchResult(mockMatchResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setJobDescription("");
    setMatchResult(null);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-blue-400";
    if (percentage >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 80) return "from-green-600 to-green-800";
    if (percentage >= 60) return "from-blue-600 to-blue-800";
    if (percentage >= 40) return "from-orange-600 to-orange-800";
    return "from-red-600 to-red-800";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Job Match Analysis</h1>
        <p className="text-slate-400">
          Paste a job description to see how well your CV matches the role.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Job Description
            </h3>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />

            <div className="space-y-3 mt-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Match"}
              </button>

              {matchResult && (
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {isAnalyzing && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
              <div className="inline-block">
                <div className="animate-spin mb-4">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <p className="text-white font-medium">
                Analyzing job match...
              </p>
            </div>
          )}

          {matchResult && !isAnalyzing && (
            <div className="space-y-6">
              {/* Match Percentage */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Match Score
                </h3>
                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <div
                      className={`flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br ${getMatchBgColor(
                        matchResult.matchPercentage
                      )}`}
                    >
                      <span
                        className={`text-3xl font-bold ${getMatchColor(
                          matchResult.matchPercentage
                        )}`}
                      >
                        {matchResult.matchPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          matchResult.matchPercentage >= 80
                            ? "bg-green-600"
                            : matchResult.matchPercentage >= 60
                            ? "bg-blue-600"
                            : matchResult.matchPercentage >= 40
                            ? "bg-orange-600"
                            : "bg-red-600"
                        }`}
                        style={{
                          width: `${matchResult.matchPercentage}%`,
                        }}
                      />
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      {matchResult.matchPercentage >= 80
                        ? "Excellent match! You have most of the required skills."
                        : matchResult.matchPercentage >= 60
                        ? "Good match! You have many of the required skills."
                        : matchResult.matchPercentage >= 40
                        ? "Fair match. Consider developing missing skills."
                        : "Limited match. You may need to learn key skills."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Matching Skills */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Your Matching Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchResult.matchingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm border border-green-600/50"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Missing Skills (Nice to Have)
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-600/20 text-orange-300 rounded-full text-sm border border-orange-600/50"
                    >
                      ✕ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Keywords */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Keywords to Highlight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchResult.recommendedKeywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/50"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  How to Improve Your Match
                </h3>
                <ol className="space-y-3">
                  {matchResult.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-blue-400 font-bold mt-0.5">
                        {idx + 1}.
                      </span>
                      <span className="text-slate-300">{suggestion}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Generate Tailored Cover Letter
              </button>
            </div>
          )}

          {!matchResult && !isAnalyzing && (
            <div className="bg-slate-800 border border-dashed border-slate-600 rounded-lg p-12 text-center">
              <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">
                Paste a job description to see how well you match
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}