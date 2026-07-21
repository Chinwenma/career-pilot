"use client";

import { useState } from "react";
import { MessageSquare, Copy, Download, Edit2, Zap } from "lucide-react";

type CoverLetterData = {
  jobTitle: string;
  companyName: string;
  tone: "professional" | "friendly" | "formal_german";
};

export default function CoverLetterPage() {
  const [formData, setFormData] = useState<CoverLetterData>({
    jobTitle: "",
    companyName: "",
    tone: "professional",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState("");

  // Mock cover letter templates
  const mockLetters: Record<string, string> = {
    professional: `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in full-stack development and proven track record of delivering high-quality solutions, I am confident in my ability to make a meaningful contribution to your team.

Throughout my professional journey, I have developed expertise in modern technologies including React, Next.js, TypeScript, and PostgreSQL. At my previous role, I successfully delivered multiple projects that improved system performance by 30% and enhanced user experience significantly. My technical foundation, combined with my commitment to clean code and best practices, positions me well to tackle the challenges outlined in this role.

What particularly excites me about this opportunity is ${formData.companyName}'s innovative approach to solving complex problems. I am eager to bring my skills and passion for technology to contribute to your mission and grow alongside your talented team.

I would welcome the opportunity to discuss how my experience aligns with your team's needs. Thank you for considering my application. I look forward to speaking with you soon.

Best regards,
Chinwe Okorie`,

    friendly: `Hi there!

I'm really excited about the ${formData.jobTitle} role at ${formData.companyName}. As a full-stack developer who genuinely loves building intuitive products, I think we could do some great work together.

Over the past few years, I've worked on some cool projects using React, Next.js, and TypeScript. One thing I'm proud of is delivering features that actually make a difference for users—I once shipped an optimization that sped up load times by 30%, and watching users enjoy a faster experience was incredibly rewarding.

What draws me to ${formData.companyName} is your commitment to innovation and user-centric design. I'm someone who's always learning, loves collaborating with talented people, and gets genuinely excited about solving hard problems. I think I'd be a great fit for your team, and I'd love to chat more about it.

Thanks for taking the time to look at my application. I'm looking forward to connecting!

Cheers,
Chinwe`,

    formal_german: `Sehr geehrte Damen und Herren,

mit großem Interesse bewerbe ich mich auf die Position des/der ${formData.jobTitle} bei ${formData.companyName}. Mit meiner Erfahrung als Full-Stack-Entwickler und meinem Verständnis für moderne Softwareentwicklung bin ich überzeugt, dass ich Ihrem Team einen wertvollen Beitrag leisten kann.

In meiner bisherigen Laufbahn habe ich umfangreiche Erfahrungen mit React, Next.js, TypeScript und PostgreSQL gesammelt. Bei meinem letzten Arbeitgeber habe ich erfolgreich mehrere Projekte realisiert, die zu einer 30%igen Verbesserung der Systemleistung führten. Meine technischen Fähigkeiten, verbunden mit meinem Engagement für qualitativ hochwertige Lösungen, qualifizieren mich ideal für diese Position.

Das Engagement von ${formData.companyName} für innovative Lösungen und kontinuierliche Verbesserung spricht mich besonders an. Ich freue mich darauf, meine Expertise einzubringen und gemeinsam mit Ihrem Team zu wachsen.

Für ein persönliches Gespräch stehe ich gerne zur Verfügung. Vielen Dank für Ihre Aufmerksamkeit.

Mit freundlichen Grüßen,
Chinwe Okorie`,
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = () => {
    if (!formData.jobTitle.trim() || !formData.companyName.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const letter = mockLetters[formData.tone] || mockLetters.professional;
      setGeneratedLetter(letter);
      setEditedLetter(letter);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    const text = isEditing ? editedLetter : generatedLetter;
    navigator.clipboard.writeText(text);
    alert("Cover letter copied to clipboard!");
  };

  const handleDownload = () => {
    const text = isEditing ? editedLetter : generatedLetter;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute(
      "download",
      `${formData.companyName}_CoverLetter.txt`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      tone: "professional",
    });
    setGeneratedLetter("");
    setEditedLetter("");
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Cover Letter Generator
        </h1>
        <p className="text-slate-400">
          Generate a personalized cover letter for your job application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Job Details
            </h3>

            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend Developer"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Langdock"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Tone
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="formal_german">
                    Formal (German - Anschreiben)
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.jobTitle || !formData.companyName}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors"
              >
                {isGenerating ? "Generating..." : "Generate Letter"}
              </button>

              {generatedLetter && (
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

        {/* Output Section */}
        <div className="lg:col-span-2">
          {isGenerating && (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
              <div className="inline-block">
                <div className="animate-spin mb-4">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <p className="text-white font-medium">Generating your cover letter...</p>
            </div>
          )}

          {generatedLetter && !isGenerating && (
            <div className="space-y-4">
              {/* Editor Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? "Preview" : "Edit"}
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>

              {/* Content Area */}
              {isEditing ? (
                <textarea
                  value={editedLetter}
                  onChange={(e) => setEditedLetter(e.target.value)}
                  className="w-full h-96 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm leading-relaxed focus:outline-none focus:border-blue-500 transition-colors font-mono resize-none"
                />
              ) : (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-slate-200 h-96 overflow-auto whitespace-pre-wrap leading-relaxed">
                  {generatedLetter}
                </div>
              )}

              {/* Info */}
              <p className="text-sm text-slate-400">
                {isEditing
                  ? "Edit your cover letter as needed. Changes will be reflected when you copy or download."
                  : "Review your cover letter. Click 'Edit' to make changes."}
              </p>
            </div>
          )}

          {!generatedLetter && !isGenerating && (
            <div className="bg-slate-800 border border-dashed border-slate-600 rounded-lg p-12 text-center">
              <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">
                Fill in the details and generate a cover letter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}