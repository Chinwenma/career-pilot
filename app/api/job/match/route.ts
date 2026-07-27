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
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Compare this CV with the job description and provide a JSON response:
{
  "matchPercentage": <number 0-100>,
  "matchingSkills": [<array of skills found in both>],
  "missingSkills": [<array of skills needed but not in CV>],
  "recommendedKeywords": [<array of keywords to add>],
  "suggestions": [<array of improvement suggestions>]
}

CV:
${cvText}

JOB DESCRIPTION:
${jobDescription}

Respond ONLY with valid JSON, no markdown or extra text.`,
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