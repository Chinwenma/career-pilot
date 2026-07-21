"use client";

import { useState } from "react";
import { Settings, Bell, Globe, Lock, LogOut, Save } from "lucide-react";

type UserSettings = {
  language: "en" | "de";
  emailNotifications: boolean;
  jobAlerts: boolean;
  weeklyDigest: boolean;
  theme: "dark" | "light";
  privateProfile: boolean;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    language: "en",
    emailNotifications: true,
    jobAlerts: true,
    weeklyDigest: false,
    theme: "dark",
    privateProfile: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof UserSettings) => {
    if (typeof settings[key] === "boolean") {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const handleSelectChange = (
    key: keyof UserSettings,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value as any,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Language Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Language</h3>
          </div>

          <div>
            <label className="block text-slate-200 text-sm font-medium mb-3">
              Preferred Language
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                handleSelectChange("language", e.target.value)
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="en">English</option>
              <option value="de">Deutsch (German)</option>
            </select>
            <p className="text-slate-400 text-sm mt-2">
              Choose your preferred language for the interface and generated
              content.
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>

          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-slate-400 text-sm">
                  Receive updates about your applications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Job Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Job Alerts</p>
                <p className="text-slate-400 text-sm">
                  Get notified about matching job postings
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.jobAlerts}
                  onChange={() => handleToggle("jobAlerts")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Weekly Digest */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Weekly Digest</p>
                <p className="text-slate-400 text-sm">
                  Receive a weekly summary of your activity
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.weeklyDigest}
                  onChange={() => handleToggle("weeklyDigest")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Privacy</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Private Profile</p>
              <p className="text-slate-400 text-sm">
                Hide your profile from other users
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privateProfile}
                onChange={() => handleToggle("privateProfile")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-slate-400" />
            <h3 className="text-lg font-semibold text-white">Account</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-left">
              Change Password
            </button>
            <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-left">
              Two-Factor Authentication
            </button>
            <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-left">
              Download My Data
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Danger Zone
          </h3>

          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/50 rounded-lg font-medium transition-colors">
              Log Out of All Devices
            </button>
            <button className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/50 rounded-lg font-medium transition-colors">
              Delete Account
            </button>
          </div>
          <p className="text-red-400 text-sm mt-4">
            Deleting your account is permanent and cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
}