"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { User, Mail, MapPin, Award, Edit2, Save } from "lucide-react";
import { updateProfile } from "@/app/actions/profile";

export type ProfileData = {
  name: string;
  email: string;
  location: string;
  headline: string;
  bio: string;
  skills: string[];
};

export function ProfileClient({
  initialProfile,
  applicationsCount,
}: {
  initialProfile: ProfileData;
  applicationsCount: number;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [formData, setFormData] = useState<ProfileData>(initialProfile);
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

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateProfile({
      name: formData.name,
      location: formData.location,
      headline: formData.headline,
      bio: formData.bio,
      skills: formData.skills,
    });
    setIsSaving(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated!");
    router.refresh();
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
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg font-medium transition-colors"
            >
              <Save className="w-5 h-5" />
              {isSaving ? "Saving..." : "Save"}
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
                <p className="text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </p>
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
                    {profile.location || "Not set"}
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
                  <p className="text-slate-300">
                    {profile.headline || "Not set"}
                  </p>
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
                  <p className="text-slate-300">{profile.bio || "Not set"}</p>
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
              {(isEditing ? formData.skills : profile.skills).map((skill) => (
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
              {!isEditing && profile.skills.length === 0 && (
                <p className="text-slate-400 text-sm">No skills added yet.</p>
              )}
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
              <p className="text-slate-400 text-sm mt-1">
                {profile.headline || "No headline set"}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="break-all">{profile.email}</span>
              </div>
              {profile.location && (
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{profile.location}</span>
                </div>
              )}
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
                    {applicationsCount}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">Applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
