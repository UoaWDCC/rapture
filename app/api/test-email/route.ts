/*email system testing*/
import payload from "payload";
import { sendEmail } from "@/lib/email/send_email";


export async function GET() {
  await sendEmail({
    to: "dummy_email@gmail.com",
    subject: "Test Email",
    html: "<h1>Sup. this is testing by yours truly.</h1>"
  });

  return Response.json({ success: true });
}

/*console.log("EMAIL PLUGIN EXISTS?", (payload as any).sendEmail);*/
