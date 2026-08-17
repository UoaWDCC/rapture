import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import NewSubsConfirmation from "@/lib/email/email_templates/newSubsConfirmation";

export async function POST() {
    try {
        const payload = await getPayload({ config });
        const headersList = await headers();
        const { user } = await payload.auth({
            headers: headersList,
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Not logged in.",
            }, { status: 401 });
        }

        await payload.update({
            collection: "users",
            id: user.id,
            data: {
                newSubs: true,
            },
        })

        const html = await render(
            React.createElement(NewSubsConfirmation, { name: user.email, })
        );

        await sendEmail({
            to: user.email,
            subject: "News Subscription",
            html,
        })

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("Subs error:", error);
        
        return NextResponse.json({
            success: false,
            error: "failed to send subs email",
        }, { status: 500 });
    }
}