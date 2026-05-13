/*import payload from 'payload'
import payload  from "payload";
import config from "@/payload.config";*/

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendEmailTypes = {
    to: string,
    subject: string,
    html: string,
}

export async function sendEmail({
    to,
    subject,
    html
}: SendEmailTypes) {
    console.log("sending email to:", to);/*temp*/

    /*const payload = await getPayload({ config });*/

    return await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        html
    });

    /*console.log("Email sent to", result)*/
}