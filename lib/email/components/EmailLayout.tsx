import { Body, Html, Head, Preview, Text, Img, Container, Section, Hr, Button, Heading } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";

export const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Brand colours, same as --color-brand-* in app/(frontend)/styles.css
export const yellow = "#f2b423";
const darkBrown = "#150703";
const cardBrown = "#130604";
export const mutedGold = "#8a6d3b";

// Email clients can't load next/font, so the Google Fonts link is used instead.
// Clients that block web fonts (e.g. Gmail) fall back to Arial.
const fontFamily = "'Nova Cut', Arial, sans-serif";

// Soft glow on the yellow text, as in the Figma design. Clients that don't
// support text-shadow just show flat text.
const glow = "0 0 6px rgba(242, 180, 35, 0.45)";

// Shared styles for the content inside the card, so every template looks the same
export const headingStyle: CSSProperties = {
  color: yellow,
  fontFamily,
  fontSize: "19px",
  lineHeight: "26px",
  fontWeight: "bold",
  textAlign: "center",
  textShadow: glow,
  margin: "0 0 10px",
};

export const textStyle: CSSProperties = {
  color: yellow,
  fontFamily,
  fontSize: "14.5px",
  lineHeight: "18px",
  textAlign: "center",
  whiteSpace: "pre-wrap",
  textShadow: glow,
  margin: "0 0 18px",
};

// Smaller, left-aligned text for labelled details (order lines, enquiry info)
export const detailStyle: CSSProperties = {
  ...textStyle,
  textAlign: "left",
  margin: 0,
};

export const linkStyle: CSSProperties = {
  color: yellow,
  textDecoration: "underline",
};

// Inner box for quoted or tabular content (message copies, order lines)
export const boxStyle: CSSProperties = {
  border: `1px solid ${mutedGold}`,
  borderRadius: "4px",
  padding: "14px 16px",
  margin: "0 0 18px",
};

// Inline styles above are the source of truth; these only tweak spacing on
// narrow screens for clients that support <style>.
const responsiveCss = `
  @media only screen and (max-width: 480px) {
    .rp-header { padding: 40px 12px 20px !important; }
    .rp-header-text { font-size: 18px !important; letter-spacing: 0.5px !important; }
    .rp-card-wrap { padding: 24px 12px 12px !important; }
    .rp-card { padding: 28px 16px 32px !important; }
    .rp-hr { margin: 8px 12px 0 !important; width: auto !important; }
    .rp-button { width: 100% !important; }
    .rp-box { padding: 12px !important; }  }
`;

type EmailButtonProps = {
  href: string;
  children: ReactNode;
};

export function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Section style={{ textAlign: "center" }}>
      <Button
        href={href}
        className="rp-button"
        style={{
          backgroundColor: yellow,
          color: darkBrown,
          fontFamily,
          fontSize: "20px",
          lineHeight: "22px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          textAlign: "center",
          width: "316px",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: "17px 12px",
          borderRadius: "4px",
          boxShadow: `0 0 10px rgba(242, 180, 35, 0.55)`,
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

type EmailLayoutProps = {
  // Short summary shown next to the subject line in the inbox
  preview: string;
  // Heading at the top of the card
  heading: ReactNode;
  // Line under the divider. Defaults to the studio sign-off.
  signOff?: ReactNode;
  // Optional call to action under the sign-off
  button?: { href: string; label: string };
  // Text in the band above the banner
  title?: string;
  children: ReactNode;
};

export function EmailLayout({
  preview,
  heading,
  signOff = "Burn & Fallow.",
  button,
  title = "Welcome to Studio Rapture",
  children,
}: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* The design is dark already; stop mail apps from inverting it */}
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
        <link href="https://fonts.googleapis.com/css2?family=Nova+Cut&display=swap" rel="stylesheet" />
        <style>{responsiveCss}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#000000", margin: 0, padding: "32px 0 0" }}>
        <Container style={{ backgroundColor: darkBrown, maxWidth: "600px", width: "100%" }}>
          <Section className="rp-header" style={{ padding: "64px 20px 26px" }}>
            <Text
              className="rp-header-text"
              style={{
                color: yellow,
                fontFamily,
                fontSize: "22px",
                lineHeight: "30px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textAlign: "center",
                textShadow: glow,
                margin: 0,
              }}
            >
              {title}
            </Text>
          </Section>

          <Img
            src={`${baseUrl}/rapture_emailbanner.png`}
            width="600"
            alt="Studio Rapture"
            style={{ display: "block", width: "100%", height: "auto" }}
          />

          <Section className="rp-card-wrap" style={{ padding: "32px 26px 24px" }}>
            <Section
              className="rp-card"
              style={{
                backgroundColor: cardBrown,
                border: `1px solid ${mutedGold}`,
                borderRadius: "5px",
                padding: "30px 22px 44px",
              }}
            >
              <Heading as="h1" style={headingStyle}>
                {heading}
              </Heading>

              {children}

              <Hr
                className="rp-hr"
                style={{
                  border: "none",
                  borderTop: `1px solid ${mutedGold}`,
                  width: "auto",
                  margin: "12px 26px 0",
                }}
              />
              <Text
                style={{
                  ...textStyle,
                  fontSize: "14px",
                  margin: button ? "14px 0 18px" : "14px 0 30px",
                }}
              >
                {signOff}
              </Text>

              {button && <EmailButton href={button.href}>{button.label}</EmailButton>}
            </Section>
          </Section>

          {/* Logo and gothic pattern are one image so they line up in every
              client, including the ones that drop background images. */}
          <Img
            src={`${baseUrl}/email/footer.jpg`}
            width="600"
            alt="Studio Rapture"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </Container>
      </Body>
    </Html>
  );
}
