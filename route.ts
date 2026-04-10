import { OpenAI } from "openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return Response.json({
    content: completion.choices[0].message.content,
  });
}import { streamText } from "ai";
import { xai } from "@ai-sdk/xai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are Pixora Assistant — a friendly, professional sales assistant for Pixora.
We create high-converting short-form videos for TikTok, Instagram Reels, YouTube Shorts, and ads.
We offer done-for-you service: scroll-stopping videos, ad creatives, strong hooks & captions, and fast turnaround.
Pricing is custom based on monthly volume. Always be helpful, enthusiastic, and offer to give a quote via "Get Started".
Keep replies natural and concise.`;

  const result = await streamText({
    model: xai("grok-3"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
