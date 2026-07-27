import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const MOCK_PASSWORD = "Password123!";

const usersData = [
  {
    name: "Amaka Obi",
    email: "amaka.obi@example.com",
    location: "Lagos, Nigeria",
    headline: "Frontend Engineer",
    bio: "Frontend engineer with 4 years of experience building accessible, performant React applications.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Accessibility"],
    applications: [
      {
        company: "Paystack",
        position: "Frontend Engineer",
        status: "interview",
        location: "Lagos, Nigeria",
        salary: "₦9,500,000/yr",
        notes: "Technical interview scheduled for next week.",
      },
      {
        company: "Flutterwave",
        position: "Senior Frontend Engineer",
        status: "applied",
        location: "Remote",
        salary: "₦12,000,000/yr",
        notes: "Applied via referral from a former colleague.",
      },
      {
        company: "Andela",
        position: "React Developer",
        status: "rejected",
        location: "Remote",
        salary: null,
        notes: "Rejected after the first screening call.",
      },
    ],
    cvAnalysis: {
      fileName: "amaka-obi-cv.pdf",
      atsScore: 78,
      strengths: ["Clear work history", "Strong keyword match for React roles"],
      weaknesses: ["No quantifiable metrics", "Missing summary section"],
      missingSkills: ["GraphQL", "Testing (Jest/RTL)"],
      suggestions: [
        "Add measurable impact to each role, e.g. performance improvements.",
        "Include a professional summary at the top of the CV.",
      ],
    },
  },
  {
    name: "Tunde Bakare",
    email: "tunde.bakare@example.com",
    location: "Abuja, Nigeria",
    headline: "Backend Engineer",
    bio: "Backend engineer specializing in distributed systems and API design.",
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS", "System Design"],
    applications: [
      {
        company: "Interswitch",
        position: "Backend Engineer",
        status: "offer",
        location: "Lagos, Nigeria",
        salary: "₦10,800,000/yr",
        notes: "Received an offer, negotiating start date.",
      },
      {
        company: "Moniepoint",
        position: "Software Engineer, Payments",
        status: "interview",
        location: "Lagos, Nigeria",
        salary: "₦11,500,000/yr",
        notes: "Onsite interview completed, awaiting feedback.",
      },
    ],
    cvAnalysis: {
      fileName: "tunde-bakare-cv.pdf",
      atsScore: 85,
      strengths: ["Strong technical depth", "Good use of action verbs"],
      weaknesses: ["Formatting inconsistent across sections"],
      missingSkills: ["Kubernetes"],
      suggestions: [
        "Standardize date formatting across all roles.",
        "Mention experience with container orchestration if applicable.",
      ],
    },
  },
  {
    name: "Ifeoma Nwosu",
    email: "ifeoma.nwosu@example.com",
    location: "Port Harcourt, Nigeria",
    headline: "Product Designer",
    bio: "Product designer passionate about crafting intuitive user experiences for fintech products.",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    applications: [
      {
        company: "Piggyvest",
        position: "Product Designer",
        status: "applied",
        location: "Remote",
        salary: null,
        notes: "Portfolio submitted along with application.",
      },
    ],
    cvAnalysis: {
      fileName: "ifeoma-nwosu-cv.pdf",
      atsScore: 70,
      strengths: ["Strong portfolio links", "Clear design process descriptions"],
      weaknesses: ["CV is text-heavy for a design role", "No visual hierarchy"],
      missingSkills: ["Motion design", "Usability testing"],
      suggestions: [
        "Use a cleaner layout with more whitespace.",
        "Link directly to 2-3 flagship case studies.",
      ],
    },
  },
];

async function main() {
  const hashedPassword = await hash(MOCK_PASSWORD, 10);

  for (const { applications, cvAnalysis, ...userData } of usersData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: { ...userData, password: hashedPassword, approvalStatus: "APPROVED" },
      create: { ...userData, password: hashedPassword, approvalStatus: "APPROVED" },
    });

    await prisma.application.deleteMany({ where: { userId: user.id } });
    await prisma.application.createMany({
      data: applications.map((application) => ({
        ...application,
        userId: user.id,
      })),
    });

    await prisma.cVAnalysis.deleteMany({ where: { userId: user.id } });
    await prisma.cVAnalysis.create({
      data: { ...cvAnalysis, userId: user.id },
    });
  }

  console.log(`Seeded ${usersData.length} users.`);
  console.log(`Mock login password for all seeded users: ${MOCK_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
