"use client";

import { useState } from "react";
import { User, Mail, MapPin, Briefcase, Award, BookOpen, Edit2, Save } from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  location: string;
  headline: string;
  bio: string;
  skills: string[];
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Chinwe Uzoma Okorie",
    email: "chinwe@example.com",
    location: "Berlin, Germany 🇩🇪",
    headline: "Full-Stack Developer | TypeScript & React",
    bio: "Passionate about building scalable SaaS products. 3+ years of experience with React, Next.js, Node.js, and PostgreSQL.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Docker",
      "Git",
    ],
    experience: [
      {
        id: "1",
        title: "Frontend Developer",
        company: "Verbum Networks Limited",
        duration: "Jan 2024 - Apr 2026",
      },
      {
        id: "2",
        title: "Intern Developer",
        company: "Verbum Networks Limited",
        duration: "Jul 2022 - Dec 2023",
      },
    ],
    education: [
      {
        id: "1",
        degree: "B.A. in Kommunikationswissenschaft",
        school: "Abia State University",
        year: "2022",
      },
      {
        id: "2",
        degree: "Google Digital Marketing & E-commerce Certificate",
        school: "Google",
        year: "2023",
      },
    ],
  });

  const [formData, setFormData] = useState(profile);
  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage your professional information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Edit2 className="w-5 h-5" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Name & Headline */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                ) : (
                  <p className="text-white text-lg font-semibold">
                    {profile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                ) : (
                  <p className="text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                ) : (
                  <p className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Headline
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                ) : (
                  <p className="text-slate-300">{profile.headline}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                ) : (
                  <p className="text-slate-300">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              Skills
            </h3>

            {isEditing && (
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddSkill();
                    }
                  }}
                  placeholder="Add a skill..."
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/50"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-blue-300 hover:text-blue-200 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-400" />
              Experience
            </h3>

            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-green-600 pl-4">
                  <p className="text-white font-semibold">{exp.title}</p>
                  <p className="text-slate-400">{exp.company}</p>
                  <p className="text-slate-500 text-sm">{exp.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Education
            </h3>

            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-purple-600 pl-4">
                  <p className="text-white font-semibold">{edu.degree}</p>
                  <p className="text-slate-400">{edu.school}</p>
                  <p className="text-slate-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {profile.name}
              </h2>
              <p className="text-slate-400 text-sm mt-1">{profile.headline}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="break-all">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-400">
                    {profile.skills.length}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">Skills</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">
                    {profile.experience.length}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}