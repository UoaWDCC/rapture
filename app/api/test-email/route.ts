/*email system testing*/
import { sendEmail } from "@/lib/email/send_email";


export async function GET() {
  await sendEmail({
    to: "tendean.ireneandyna@gmail.com",
    subject: "Test Email",
    html: "<h1>Sup. this is testing by yours truly.</h1>"
  });

  return Response.json({ success: true });
}