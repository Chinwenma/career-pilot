import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

    const { cvText, fileName } = await req.json();

    if (!cvText) {
      return NextResponse.json(
        { error: "CV text is required" },
        { status: 400 }
      );
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Analyze this CV and provide a JSON response with the following structure:
{
  "score": <number 0-100>,
  "strengths": [<array of strings>],
  "weaknesses": [<array of strings>],
  "missingSkills": [<array of strings>],
  "suggestions": [<array of strings>]
}

CV:
${cvText}

Respond ONLY with valid JSON, no markdown or extra text.`,
        },
      ],
    });

    // Parse Claude's response
    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const analysis = JSON.parse(responseText);

    // Save to database
    const cvAnalysis = await prisma.cVAnalysis.create({
      data: {
        userId: session.user.id,
        fileName: fileName || "CV",
        atsScore: analysis.score,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        missingSkills: analysis.missingSkills,
        suggestions: analysis.suggestions,
      },
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("CV Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}