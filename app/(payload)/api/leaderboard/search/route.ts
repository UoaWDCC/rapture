import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";

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

        const result = await payload.find({
            collection: "Players",
            where: {
                userId: {
                    like: username,
                },
            },
            overrideAccess: true,
        });

        return NextResponse.json({
            success: true,
            data: result.docs,
        });
    } catch {
        return NextResponse.json({
            success: false,
            error: "Failed to retrieve search results",
        }, { status: 500 });
    }
}