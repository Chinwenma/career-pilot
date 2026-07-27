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

    const { jobTitle, companyName, tone, cvText } = await req.json();

    if (!jobTitle || !companyName || !tone || !cvText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toneInstructions = {
      professional:
        "Write a professional, formal cover letter in English.",
      friendly:
        "Write a friendly, personable cover letter in English that shows genuine interest.",
      formal_german:
        "Write a formal German cover letter (Anschreiben) following German business standards.",
    };

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `${toneInstructions[tone as keyof typeof toneInstructions]}

Generate a cover letter for:
- Job Title: ${jobTitle}
- Company: ${companyName}

Based on this CV:
${cvText}

Write ONLY the cover letter, no introductions or explanations.`,
        },
      ],
    });

    const coverLetter =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover Letter error:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}