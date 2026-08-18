import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { subscribe } from "diagnostics_channel";

export async function GET() {
    try {
        const payload = await getPayload({ config });
        const headersList = await headers();

        const { user } = await payload.auth({
            headers: headersList,
        });

        if (!user) {
            return NextResponse.json({
                subscribed: false,
            },
            { status: 401 });
        }

        return NextResponse.json({
            subscribed: user.newSubs,
        });
    }  catch (error) {
        return NextResponse.json({
            subscribed: false,
        },
        { status: 500 });
    }
}
