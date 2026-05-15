import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";

// retrieve top 10 scores at /api/leaderboard
export async function GET() {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "Players",
      sort: "-score",
      limit: 10,
      overrideAccess: true,
    });

    return NextResponse.json({
      success: true,
      data: result.docs.map(player => ({
        userId: player.userId,
        score: player.score,
      })),
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: "Failed to retrieve leaderboard",
    }, { status: 500 });
  }
}

// make a new score at /api/leaderboard
export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config });
    const body = await request.json();

    if (!body.userId || body.score === undefined) {
      return NextResponse.json({
        success: false,
        error: "Missing userId or score",
      }, { status: 400 });
    }

    if (typeof body.score !== "number") {
      return NextResponse.json({
        success: false,
        error: "Score must be a number",
      }, { status: 400 });
    }

    const newEntry = await payload.create({
      collection: "Players",
      data: {
        userId: body.userId,
        score: body.score,
      },
      overrideAccess: true,
    });

    return NextResponse.json({
      success: true,
      data: newEntry,
    }, { status: 201 });

  } catch {
    return NextResponse.json({
      success: false,
      error: "Failed to submit score",
    }, { status: 500 });
  }
}