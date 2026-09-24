// Render tests for the newsletter subscription email.
// Run:  pnpm vitest run lib/email

import { describe, it, expect } from "vitest";
import { render } from "@react-email/render";
import Newsletter from "@/lib/email/email_templates/newsletter";

describe("Newsletter email", () => {
  it("renders the heading and the text from email settings", async () => {
    const html = await render(<Newsletter text="Right here. Straight to your inbox." />);

    expect(html).toContain("Looking for news?");
    expect(html).toContain("Right here. Straight to your inbox.");
  });

  it("uses the shared layout", async () => {
    const html = await render(<Newsletter text="hello" />);

    expect(html).toContain("Welcome to Studio Rapture");
    expect(html).toContain("Burn &amp; Fallow.");
    expect(html).toContain("/LOGO.png");
    expect(html).toContain("/images/FOOTER.png");
  });

  it("escapes HTML in the settings text", async () => {
    const html = await render(<Newsletter text="<script>alert(1)</script>" />);

    expect(html).not.toContain("<script>alert(1)</script>");
  });
});
