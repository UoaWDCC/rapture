/*import payload from 'payload'*/
import { getPayload } from "payload";
import config from "@/payload.config";

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

    const payload = await getPayload({ config });

    const result = await payload.sendEmail({
        to,
        subject,
        html
    });

    console.log("Email sent to", result)
}