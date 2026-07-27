import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cvText, jobDescription } = await req.json();

    if (!cvText || !jobDescription) {
      return NextResponse.json(
        { error: "CV and job description are required" },
        { status: 400 }
      );
    }

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
${cvText}

JOB DESCRIPTION:
${jobDescription}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const match = JSON.parse(responseText);

    return NextResponse.json(match);
  } catch (error) {
    console.error("Job Match error:", error);
    return NextResponse.json(
      { error: "Matching failed" },
      { status: 500 }
    );
  }
}