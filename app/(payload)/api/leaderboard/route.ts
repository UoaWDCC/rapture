import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";
import { withDisplayNames } from "@/lib/leaderboard";

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
      data: (await withDisplayNames(payload, result.docs)).map((player) => ({
        userId: player.userId,
        displayName: player.displayName,
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
    const { user } = await payload.auth({ headers: request.headers });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized",
      }, { status: 401 });
    }

    const body = await request.json();
    const providedUserId = body.userId != null ? String(body.userId).trim() : "";
    const currentUserId = String(user.id);

    if (providedUserId && providedUserId !== currentUserId) {
      return NextResponse.json({
        success: false,
        error: "You can only submit scores for your own account",
      }, { status: 403 });
    }

    if (body.score === undefined || typeof body.score !== "number" || Number.isNaN(body.score)) {
      return NextResponse.json({
        success: false,
        error: "Score must be a number",
      }, { status: 400 });
    }

    if (body.score < 0) {
      return NextResponse.json({
        success: false,
        error: "Score must be zero or greater",
      }, { status: 400 });
    }

    const existingPlayerResult = await payload.find({
      collection: "Players",
      where: {
        userId: {
          equals: currentUserId,
        },
      },
      limit: 1,
      overrideAccess: true,
    });

    const playerRecord = existingPlayerResult.docs[0];
    const nextEntry = playerRecord
      ? await payload.update({
          collection: "Players",
          id: playerRecord.id,
          data: {
            userId: currentUserId,
            score: body.score,
          },
          overrideAccess: true,
        })
      : await payload.create({
          collection: "Players",
          data: {
            userId: currentUserId,
            score: body.score,
          },
          overrideAccess: true,
        });

    return NextResponse.json({
      success: true,
      data: nextEntry,
    }, { status: playerRecord ? 200 : 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit score";

    return NextResponse.json({
      success: false,
      error: message,
    }, { status: 500 });
  }
}