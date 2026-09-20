import { NextRequest, NextResponse } from "next/server";

// Email is handled directly via EmailJS client protocol (no Resend required)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body as {
      name?: string;
      email?: string;
      projectType?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Direct acknowledgment: client handles transmission via EmailJS
    return NextResponse.json({
      success: true,
      message: "Direct transmission received via EmailJS protocol",
      details: { name, email, projectType },
    });
  } catch (error) {
    console.error("Collab API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
