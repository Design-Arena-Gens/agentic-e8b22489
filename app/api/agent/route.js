import { NextResponse } from "next/server";
import { runAgent } from "../../../lib/agent";

export async function POST(request) {
  try {
    const { messages = [] } = await request.json();
    const summary = runAgent(Array.isArray(messages) ? messages : []);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate agent response.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}
