import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import { getPayload } from "payload";
import config from "@/payload.config";
import { sampleEmails, type EmailSettingsText } from "@/lib/email/sample_emails";

// Sends a sample of any email, e.g. /api/test-email?to=you@example.com&type=welcome
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to");
  const type = searchParams.get("type");
  const types = Object.keys(sampleEmails).join(", ");

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return Response.json({ success: false, error: "Please provide a valid 'to' email address (e.g. ?to=your@email.com)" }, { status: 400 });
  }

  const sample = type ? sampleEmails[type] : undefined;
  if (!sample) {
    return Response.json({ success: false, error: `Please specify a valid email type (${types})` }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    const settings = (await payload.findGlobal({ slug: "emailSettings" })) as EmailSettingsText;

    const html = await render(sample.render(settings));
    const response = await sendEmail({ to, subject: `Test: ${sample.subject}`, html });

    if (response.error) {
      return Response.json({ success: false, error: response.error.message }, { status: 500 });
    }

    return Response.json({ success: true, message: `Test email of type '${type}' sent to ${to}` });
  } catch (error) {
    console.error("Test email failed:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
