/*import payload from 'payload'
import payload  from "payload";
import config from "@/payload.config";*/

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendEmailTypes = {
    to: string | string[],
    subject: string,
    html: string,
}

export async function sendEmail({
    to,
    subject,
    html
}: SendEmailTypes) {
    /*console.log("sending email to:", to); temp*/

    /*const payload = await getPayload({ config }); temp*/

    const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        html
    });

    if (response.error) {
        console.error("Resend API Error:", response.error);
    }

    return response;

    /*console.log("Email sent to", result) temp*/
}

/* Resend's batch endpoint accepts up to 100 emails per call */
const BATCH_LIMIT = 100;

/**
 * Sends many separate emails (one per recipient) in chunks.
 * Use this instead of putting many addresses in `to`, which exposes them to each other.
 */
export async function sendBatchEmails(emails: SendEmailTypes[]) {
    for (let i = 0; i < emails.length; i += BATCH_LIMIT) {
        const chunk = emails.slice(i, i + BATCH_LIMIT).map((email) => ({
            from: "onboarding@resend.dev",
            ...email,
        }));

        const response = await resend.batch.send(chunk);

        if (response.error) {
            console.error("Resend Batch API Error:", response.error);
        }
    }
}