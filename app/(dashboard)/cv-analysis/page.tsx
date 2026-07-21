"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Zap } from "lucide-react";

type AnalysisResult = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
};

export default function CVAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Mock analysis result
  const mockAnalysis: AnalysisResult = {
    score: 78,
    strengths: [
      "Strong technical background with 3+ years experience",
      "Clear project descriptions with measurable outcomes",
      "Good use of action verbs and metrics",
      "Relevant certifications listed",
    ],
    weaknesses: [
      "Missing quantifiable achievements in early roles",
      "Could emphasize leadership experience more",
      "Limited detail on collaboration skills",
    ],
    missingSkills: [
      "Docker",
      "AWS/Cloud Architecture",
      "GraphQL",
      "Kubernetes",
    ],
    suggestions: [
      "Add specific metrics to your achievements (e.g., '30% faster load times')",
      "Include 2-3 technical keywords from the job description",
      "Reorganize skills section by proficiency level",
      "Add a brief professional summary at the top",
    ],
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFile(selectedFile);
      analyzeCV(selectedFile);
    } else {
      alert("Please upload a PDF or DOCX file");
    }
  };

  const analyzeCV = (uploadedFile: File) => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">CV Analysis</h1>
        <p className="text-slate-400">
          Upload your CV to get AI-powered insights on your resume strength.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
      
<div className="lg:col-span-1">
  <div
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
      isDragging
        ? "border-blue-500 bg-blue-500/10"
        : "border-slate-600 bg-slate-800/50"
    }`}
  >
    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-white mb-2">
      Upload Your CV
    </h3>


    <input
      type="file"
      accept=".pdf,.docx"
      onChange={handleInputChange}
      className="hidden"
      id="cv-file-input"
    />
    
    <button
      type="button"
      onClick={() => {
        const input = document.getElementById("cv-file-input") as HTMLInputElement;
        input?.click();
      }}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
    >
      Choose File
    </button>

    {file && (
      <div className="mt-4 p-4 bg-slate-700 rounded-lg">
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{file.name}</span>
        </div>
      </div>
    )}
  </div>
</div>
        {/* Analysis Results */}
        <div className="lg:col-span-2">
          {isAnalyzing && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
              <div className="inline-block">
                <div className="animate-spin mb-4">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <p className="text-white font-medium">Analyzing your CV...</p>
            </div>
          )}

          {analysis && !isAnalyzing && (
            <div className="space-y-6">
              {/* ATS Score */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  ATS Score
                </h3>
                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-blue-800">
                      <span className="text-3xl font-bold text-white">
                        {analysis.score}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysis.score}%` }}
                      />
                    </div>
                    <p className="text-slate-400 text-sm mt-2">
                      {analysis.score >= 80
                        ? "Excellent! Your CV is well-optimized for ATS systems."
                        : analysis.score >= 60
                        ? "Good! But there's room for improvement."
                        : "Your CV needs some optimization for better ATS ranking."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-green-400 font-bold mt-0.5">✓</span>
                      <span className="text-slate-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Weaknesses
                  </h3>
                </div>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-orange-400 font-bold mt-0.5">!</span>
                      <span className="text-slate-300">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Missing Skills (Based on Job Market)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Improvement Suggestions
                </h3>
                <ol className="space-y-3">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-blue-400 font-bold mt-0.5">
                        {idx + 1}.
                      </span>
                      <span className="text-slate-300">{suggestion}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                  Download Report
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setAnalysis(null);
                  }}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Analyze Another CV
                </button>
              </div>
            </div>
          )}

          {!file && !analysis && !isAnalyzing && (
            <div className="bg-slate-800 border border-dashed border-slate-600 rounded-lg p-12 text-center">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">
                Upload a CV to see detailed analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}