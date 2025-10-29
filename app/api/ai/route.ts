// app/api/rewrite/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, tone } = await req.json();

    if (typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Invalid input text" }, { status: 400 });
    }

    const prompt = `Rewrite the following email in a ${tone} tone:\n\n${text}`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",     // or whichever model you choose
      messages: [
        { role: "user", content: prompt }
      ],
    });

    const output = aiResponse.choices?.[0]?.message?.content?.trim();

    if (!output) {
      return NextResponse.json({ error: "No output from OpenAI" }, { status: 500 });
    }

    return NextResponse.json({ rewritten: output });
  } catch (error: any) {
    console.error("Error in /api/rewrite:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
