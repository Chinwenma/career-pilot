"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function matchJob(cvAnalysisId: string, jobDescription: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  if (!jobDescription.trim()) {
    throw new Error("Job description is required.");
  }

  const cv = await prisma.cVAnalysis.findFirst({
    where: { id: cvAnalysisId, userId: session.user.id },
  });

  if (!cv) {
    throw new Error("CV not found.");
  }

  if (!cv.cvText) {
    throw new Error(
      "This CV was analyzed before text storage was enabled. Please re-upload it on the CV Analysis page."
    );
  }

  try {
    // Compare with Claude
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      output_config: {
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              matchPercentage: { type: "integer" },
              matchingSkills: { type: "array", items: { type: "string" } },
              missingSkills: { type: "array", items: { type: "string" } },
              recommendedKeywords: {
                type: "array",
                items: { type: "string" },
              },
              suggestions: { type: "array", items: { type: "string" } },
            },
            required: [
              "matchPercentage",
              "matchingSkills",
              "missingSkills",
              "recommendedKeywords",
              "suggestions",
            ],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "user",
          content: `Compare this CV with the job description: give a match percentage, matching skills, missing skills, recommended keywords to add, and improvement suggestions.

CV:
${cv.cvText}

JOB DESCRIPTION:
${jobDescription}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const result = JSON.parse(responseText);

    // Save to database
    const jobMatch = await prisma.jobMatch.create({
      data: {
        userId: session.user.id,
        cvAnalysisId: cv.id,
        jobDescription,
        matchPercentage: result.matchPercentage,
        matchingSkills: result.matchingSkills,
        missingSkills: result.missingSkills,
        recommendedKeywords: result.recommendedKeywords,
        suggestions: result.suggestions,
      },
    });

    revalidatePath("/job-match");

    return jobMatch;
  } catch (error) {
    console.error("Job Match error:", error);
    throw new Error(
      `Match failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
