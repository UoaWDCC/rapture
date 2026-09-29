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