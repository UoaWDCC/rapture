import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import NewsUnsubscribeConfirmation from "@/lib/email/email_templates/newsUnsubscribeConfirmation";

export async function POST() {
    try {
        const payload = await getPayload({ config });
        const headersList = await headers();
        const { user } = await payload.auth({
            headers: headersList,
        });
        const template = await payload.findGlobal({
            slug: "email-templates",
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Not logged in.",
            },
            { status: 401 });
        }

        if (!user.newSubs) {
            return NextResponse.json({
                success: false,
                error: "Not subscribed.",
            },
            { status: 409 });
        }

        await payload.update({
            collection: "users",
            id: user.id,
            data: {
                newSubs: false,
            },
        })

        {/* Sends Email */}
        if (!template) {
            throw new Error("Email template not found.")
        }
        
        const html = await render(
            React.createElement(NewsUnsubscribeConfirmation, { 
                name: user.email, 
                heading: template.newsUnsubs.heading,
                body: template.newsUnsubs.body,
            })
        );

        await sendEmail({
            to: user.email,
            subject: "Unsubscribed from (r) News",
            html,
        })

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("Subs error:", error);
        
        return NextResponse.json({
            success: false,
            error: "failed to send unsubs email",
        },
        { status: 500 });
    }
}
