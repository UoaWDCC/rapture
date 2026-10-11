// Render tests for the automated emails.
// Run:  pnpm vitest run lib/email

import { describe, it, expect } from "vitest";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";
import ContactFormConfirmationToUser from "@/lib/email/email_templates/contactFormConfirmationToUser";
import ContactFormConfirmation from "@/lib/email/email_templates/contactFormConfirmation";
import PasswordReset from "@/lib/email/email_templates/passwordReset";
import Purchase from "@/lib/email/email_templates/purchase";
import NewsUpdate from "@/lib/email/email_templates/newsUpdate";
import { sampleEmails } from "@/lib/email/sample_emails";

describe("Welcome email", () => {
  it("shows the Figma heading, settings text, sign-off and button", async () => {
    const html = await render(<Welcome text="VITRIOL is our primary concern" />);

    expect(html).toContain("Thank you for signing up!");
    expect(html).toContain("VITRIOL is our primary concern");
    expect(html).toContain("So get running!");
    expect(html).toContain("Press here");
    expect(html).toContain("/leaderboard");
  });
});

describe("Contact form emails", () => {
  it("greets the user by name and repeats their message", async () => {
    const html = await render(<ContactFormConfirmationToUser name="Alex Taylor" form="Where is my score?" />);

    expect(html).toContain("Thanks for reaching out, Alex Taylor!");
    expect(html).toContain("Where is my score?");
  });

  it("falls back to a plain greeting when no name was given", async () => {
    const html = await render(<ContactFormConfirmationToUser name="  " form="hi" />);

    expect(html).toContain("Thanks for reaching out!");
  });

  it("gives the admin the sender, category and a reply link", async () => {
    const html = await render(
      <ContactFormConfirmation name="Alex Taylor" email="alex@example.com" category="support" form="Help" />,
    );

    expect(html).toContain("Alex Taylor reached out");
    expect(html).toContain("mailto:alex@example.com");
    expect(html).toContain("Support");
    expect(html).toContain("Help");
  });

  it("shows 'Not specified' when no category was picked", async () => {
    const html = await render(<ContactFormConfirmation name="A" email="a@b.co" category="" form="x" />);

    expect(html).toContain("Not specified");
  });

  it("escapes HTML in the message", async () => {
    const html = await render(<ContactFormConfirmationToUser name="A" form="<script>alert(1)</script>" />);

    expect(html).not.toContain("<script>alert(1)</script>");
  });
});

describe("Password reset email", () => {
  it("links to the reset page with the token", async () => {
    const html = await render(
      <PasswordReset resetUrl="http://localhost:3000/change-password?token=abc123" email="alex@example.com" />,
    );

    expect(html).toContain("Forgot your password?");
    expect(html).toContain("change-password?token=abc123");
    expect(html).toContain("alex@example.com");
    expect(html).toContain("Reset password");
  });
});

describe("Purchase email", () => {
  const items = [
    { productName: "VITRIOL", price: 24.99, quantity: 1 },
    { productName: "Tee", price: 39.5, quantity: 2 },
  ];

  it("lists each item with line totals and the order total", async () => {
    const html = await render(
      <Purchase text="Thanks!" items={items} totalPrice={103.99} orderId="66f7c1a9e4b0a1b2c3d4e5f6" orderDate="2026-09-28T10:00:00Z" />,
    );

    expect(html).toContain("Thank you for your order!");
    expect(html).toContain("VITRIOL");
    expect(html).toContain("$79.00");
    expect(html).toContain("$103.99");
    expect(html).toContain("NZD");
    expect(html).toContain("Order #C3D4E5F6");
    expect(html).toContain("September 2026");
    expect(html).not.toContain("Customer:");
  });

  it("shows the customer's email on the admin copy", async () => {
    const html = await render(
      <Purchase text="New order" items={items} totalPrice={103.99} purchaserEmail="alex@example.com" />,
    );

    expect(html).toContain("New order received");
    expect(html).toContain("Customer: alex@example.com");
  });

  it("copes with a bad total", async () => {
    const html = await render(<Purchase text="x" items={[]} totalPrice={Number.NaN} />);

    expect(html).toContain("$0.00");
  });
});

describe("News update email", () => {
  it("shows the post and links to it", async () => {
    const html = await render(
      <NewsUpdate title="Arcade Mode is live" subtitle="Post your best run" url="http://localhost:3000/news/1" imageUrl="/media/a.png" />,
    );

    expect(html).toContain("Arcade Mode is live");
    expect(html).toContain("Post your best run");
    expect(html).toContain("http://localhost:3000/news/1");
    expect(html).toContain("/media/a.png");
    expect(html).toContain("Read more");
  });
});

describe("Sample emails", () => {
  it.each(Object.keys(sampleEmails))("%s renders with the shared layout", async (key) => {
    const html = await render(sampleEmails[key].render({}));

    expect(html).toContain("/email/footer.jpg");
    expect(html).toContain("/rapture_emailbanner.png");
  });
});
