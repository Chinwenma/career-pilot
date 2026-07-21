"use client";

import { useState } from "react";
import {
  ClipboardList,
  Plus,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Award,
} from "lucide-react";

type ApplicationStatus = "applied" | "interview" | "rejected" | "offer";

type Application = {
  id: string;
  company: string;
  position: string;
  dateApplied: string;
  status: ApplicationStatus;
  location?: string;
  salary?: string;
  notes?: string;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      company: "Langdock",
      position: "Frontend Developer",
      dateApplied: "2024-07-15",
      status: "interview",
      location: "Berlin",
      salary: "€60k - €80k",
      notes: "First round completed, waiting for technical interview",
    },
    {
      id: "2",
      company: "JustWatch",
      position: "Full-Stack Developer",
      dateApplied: "2024-07-10",
      status: "applied",
      location: "Berlin",
      salary: "€65k - €85k",
      notes: "Awaiting response from recruiter",
    },
    {
      id: "3",
      company: "GAIA",
      position: "React Developer",
      dateApplied: "2024-07-05",
      status: "rejected",
      location: "Remote",
      notes: "Not a fit for current needs",
    },
    {
      id: "4",
      company: "SumUp",
      position: "Backend Engineer",
      dateApplied: "2024-07-12",
      status: "offer",
      location: "Berlin",
      salary: "€70k - €90k",
      notes: "Offer received, negotiating salary",
    },
    {
      id: "5",
      company: "Zalando",
      position: "Full-Stack Developer",
      dateApplied: "2024-07-08",
      status: "applied",
      location: "Berlin",
      salary: "€60k - €80k",
    },
  ]);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | "all">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      filterStatus === "all" || app.status === filterStatus;
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Status badge component
  const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const statusConfig = {
      applied: {
        icon: Clock,
        color: "bg-blue-600/20 text-blue-300 border-blue-600/50",
        label: "Applied",
      },
      interview: {
        icon: CheckCircle,
        color: "bg-yellow-600/20 text-yellow-300 border-yellow-600/50",
        label: "Interview",
      },
      rejected: {
        icon: XCircle,
        color: "bg-red-600/20 text-red-300 border-red-600/50",
        label: "Rejected",
      },
      offer: {
        icon: Award,
        color: "bg-green-600/20 text-green-300 border-green-600/50",
        label: "Offer",
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${config.color}`}
      >
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
    );
  };

  // Delete application
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((app) => app.id !== id));
      setSelectedApp(null);
    }
  };

  // Count stats
  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offer: applications.filter((a) => a.status === "offer").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Applications</h1>
          <p className="text-slate-400">Track all your job applications</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Application
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-blue-400" },
          { label: "Applied", value: stats.applied, color: "text-blue-400" },
          { label: "Interview", value: stats.interview, color: "text-yellow-400" },
          { label: "Offers", value: stats.offer, color: "text-green-400" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          >
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as ApplicationStatus | "all")
          }
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-slate-700 bg-slate-750 font-semibold text-slate-300 text-sm">
              <div>Company</div>
              <div>Position</div>
              <div>Date Applied</div>
              <div>Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-700">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="grid grid-cols-4 gap-4 p-4 hover:bg-slate-700/50 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-medium text-white">{app.company}</p>
                      {app.location && (
                        <p className="text-xs text-slate-400">{app.location}</p>
                      )}
                    </div>
                    <div className="text-slate-300">{app.position}</div>
                    <div className="text-slate-400 text-sm">
                      {new Date(app.dateApplied).toLocaleDateString("de-DE")}
                    </div>
                    <div>
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <ClipboardList className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p>No applications found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="lg:col-span-1">
          {selectedApp ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-4">Details</h3>

              <div className="space-y-4">
                {/* Company */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Company</p>
                  <p className="text-white font-medium">{selectedApp.company}</p>
                </div>

                {/* Position */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Position</p>
                  <p className="text-white font-medium">{selectedApp.position}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Status</p>
                  <StatusBadge status={selectedApp.status} />
                </div>

                {/* Location */}
                {selectedApp.location && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Location</p>
                    <p className="text-white">{selectedApp.location}</p>
                  </div>
                )}

                {/* Salary */}
                {selectedApp.salary && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Salary</p>
                    <p className="text-white">{selectedApp.salary}</p>
                  </div>
                )}

                {/* Date Applied */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Date Applied</p>
                  <p className="text-white">
                    {new Date(selectedApp.dateApplied).toLocaleDateString(
                      "de-DE"
                    )}
                  </p>
                </div>

                {/* Notes */}
                {selectedApp.notes && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Notes</p>
                    <p className="text-slate-300 text-sm">{selectedApp.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2 mt-6">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(selectedApp.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/50 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 border border-dashed border-slate-600 rounded-lg p-8 text-center">
              <ClipboardList className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}