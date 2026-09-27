import { render } from "@react-email/render";
import { sampleEmails } from "@/lib/email/sample_emails";

// Dev only: shows an email in the browser instead of sending it.
// Open http://localhost:3000/api/preview-email for the list of emails.
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const type = new URL(request.url).searchParams.get("type");
  const sample = type ? sampleEmails[type] : undefined;

  if (!sample) {
    const links = Object.keys(sampleEmails)
      .map((key) => `<li><a href="?type=${key}">${key}</a> &mdash; ${sampleEmails[key].subject}</li>`)
      .join("");
    return new Response(`<h1>Email previews</h1><ul>${links}</ul>`, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Sample text only, so this works without the database running
  const html = await render(sample.render({}));
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
