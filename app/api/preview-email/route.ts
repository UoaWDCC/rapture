import { render } from "@react-email/render";
import React from "react";
import Newsletter from "@/lib/email/email_templates/newsletter";

// Dev only: shows an email in the browser instead of sending it.
// Open http://localhost:3000/api/preview-email
import Welcome from "@/lib/email/email_templates/welcome";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const type = new URL(request.url).searchParams.get("type");
  let html = "";

  if (type === "newsletter") {
    html = await render(React.createElement(Newsletter, { text: "Some newsletter text" }));
  } else if (type === "welcome") {
    html = await render(React.createElement(Welcome, { name: "Tester", text: "Some welcome text" }));
  } else {
    return new Response("Try ?type=newsletter or ?type=welcome", { status: 400 });
  }

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
