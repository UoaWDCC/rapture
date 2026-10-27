import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";
import { withDisplayNames } from "@/lib/leaderboard";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username || username.trim() === "") {
            return NextResponse.json({
                success: false,
                error: "Username query is required",
            }, { status: 400 });
        }

        const payload = await getPayload({config});

        const term = username.trim();

        // Scores are stored under account IDs, so find the accounts whose username matches first
        const matchingUsers = await payload.find({
            collection: "users",
            where: { username: { like: term } },
            limit: 50,
            depth: 0,
            overrideAccess: true,
            select: { username: true },
        });
        const userIds = matchingUsers.docs.map((user) => String(user.id));

        const result = await payload.find({
            collection: "Players",
            where: {
                or: [
                    // names an admin typed in by hand
                    { userId: { like: term } },
                    ...(userIds.length > 0 ? [{ userId: { in: userIds } }] : []),
                ],
            },
            sort: "-score",
            overrideAccess: true,
        });

        return NextResponse.json({
            success: true,
            data: await withDisplayNames(payload, result.docs),
        });
    } catch {
        return NextResponse.json({
            success: false,
            error: "Failed to retrieve search results",
        }, { status: 500 });
    }
}