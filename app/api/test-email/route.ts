import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";
import Newsletter from "@/lib/email/email_templates/newsletter";
import Purchase from "@/lib/email/email_templates/purchase";
import { getPayload } from "payload";
import config from "@/payload.config";
import React from "react";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to");
  const type = searchParams.get("type"); // welcome, newsletter, purchase, purchaseAdmin

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return Response.json({ success: false, error: "Please provide a valid 'to' email address (e.g. ?to=your@email.com)" }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: "emailSettings" }) as { welcomeEmailText?: string; newsletterEmailText?: string; purchaseEmailText?: string; adminPurchaseEmailText?: string };
    
    let html = "";
    let subject = "Test Email";

    if (type === "welcome") {
      subject = "Test: Welcome!";
      const text = settings?.welcomeEmailText || "Welcome!";
      html = await render(React.createElement(Welcome, { name: "Tester", text: text }));
    } else if (type === "newsletter") {
      subject = "Test: Newsletter Subscription";
      const text = settings?.newsletterEmailText || "Newsletter content";
      html = await render(React.createElement(Newsletter, { text: text }));
    } else if (type === "purchase") {
      subject = "Test: Order Confirmation";
      const text = settings?.purchaseEmailText || "Thank you for purchasing!";
      html = await render(React.createElement(Purchase, { text: text, totalPrice: 100.50, items: [
          { productName: "Test Game", price: 50.00, quantity: 1 },
          { productName: "Test Merch", price: 50.50, quantity: 1 }
        ]}));
    } else if (type === "purchaseAdmin") {
      subject = "Test: New Order Received";
      const text = settings?.adminPurchaseEmailText || "New purchase details:";
      html = await render(React.createElement(Purchase, { text: text, totalPrice: 50.00, purchaserEmail: "customer@example.com", items: [
          { productName: "Test Game", price: 50.00, quantity: 1 },
        ]}));
    } else {
      return Response.json({ success: false, error: "Please specify a valid email type (welcome, newsletter, purchase, purchaseAdmin)" }, { status: 400 });
    }

    const response = await sendEmail({
      to,
      subject,
      html,
    });

    if (response.error) {
      return Response.json({ success: false, error: response.error.message }, { status: 500 });
    }

    return Response.json({ success: true, message: `Test email of type '${type}' sent to ${to}` });
  } catch (error) {
    console.error("Test email failed:", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
