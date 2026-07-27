"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Anthropic } from "@anthropic-ai/sdk";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs";
import mammoth from "mammoth";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Bundlers can't resolve pdf.js's runtime worker path, so wire the worker
// module in directly; pdf.js checks for this before attempting that import.
(globalThis as { pdfjsWorker?: typeof pdfjsWorker }).pdfjsWorker = pdfjsWorker;

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let text = "";

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const textContent = await page.getTextContent();
    text += textContent.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return text;
}

async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const { value } = await mammoth.extractRawText({ buffer });
  return value;
}

export async function analyzeCv(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("No file provided.");
  }

  const fileName = file.name;
  const fileType = file.type;

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let cvText = "";

    // Extract text based on file type
    if (fileType === "application/pdf") {
      cvText = await extractTextFromPdf(fileBuffer);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cvText = await extractTextFromDocx(fileBuffer);
    } else {
      throw new Error("Unsupported file type. Please upload PDF or DOCX.");
    }

    if (!cvText.trim()) {
      throw new Error("Could not extract text from file");
    }

    // Analyze with Claude
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      output_config: {
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              score: { type: "integer" },
              strengths: { type: "array", items: { type: "string" } },
              weaknesses: { type: "array", items: { type: "string" } },
              missingSkills: { type: "array", items: { type: "string" } },
              suggestions: { type: "array", items: { type: "string" } },
            },
            required: [
              "score",
              "strengths",
              "weaknesses",
              "missingSkills",
              "suggestions",
            ],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "user",
          content: `Analyze this CV and score it (0-100), listing 3-4 strengths, 2-3 weaknesses, 4-5 missing skills, and 3-4 suggestions.

CV TEXT:
${cvText}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const analysis = JSON.parse(responseText);

    // Save to database
    const cvAnalysis = await prisma.cVAnalysis.create({
      data: {
        userId: session.user.id,
        fileName,
        atsScore: analysis.score,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        missingSkills: analysis.missingSkills,
        suggestions: analysis.suggestions,
      },
    });

    revalidatePath("/cv-analysis");
    revalidatePath("/dashboard");

    return cvAnalysis;
  } catch (error) {
    console.error("CV Analysis error:", error);
    throw new Error(
      `Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}