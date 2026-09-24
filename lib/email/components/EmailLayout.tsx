import { Body, Html, Head, Preview, Text, Img, Container, Section, Hr, Button } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";

export const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Brand colours, same as --color-brand-* in app/(frontend)/styles.css
const yellow = "#f2b423";
const darkBrown = "#150703";
const cardBrown = "#0f0402";
const mutedGold = "#8c6a1f";

// Email clients can't load next/font, so the Google Fonts link is used instead.
// Clients that block web fonts (e.g. Gmail) fall back to Arial.
const fontFamily = "'Nova Cut', Arial, sans-serif";

// Shared styles for the content inside the card, so every template looks the same
export const headingStyle: CSSProperties = {
  color: yellow,
  fontFamily,
  fontSize: "20px",
  fontWeight: "normal",
  textAlign: "center",
  margin: "0 0 16px",
};

export const textStyle: CSSProperties = {
  color: yellow,
  fontFamily,
  fontSize: "14px",
  lineHeight: "22px",
  textAlign: "center",
  whiteSpace: "pre-wrap",
  margin: "0 0 16px",
};

type EmailButtonProps = {
  href: string;
  children: ReactNode;
};

export function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Section style={{ textAlign: "center", margin: "8px 0 16px" }}>
      <Button
        href={href}
        style={{
          backgroundColor: yellow,
          color: darkBrown,
          fontFamily,
          fontSize: "16px",
          textTransform: "uppercase",
          padding: "12px 40px",
          borderRadius: "4px",
          boxShadow: `0 0 12px ${yellow}`,
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
  children: ReactNode;
};

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Nova+Cut&display=swap" rel="stylesheet" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#000000", margin: 0, padding: "20px 0" }}>
        <Container style={{ backgroundColor: darkBrown, maxWidth: "600px", width: "100%" }}>
          <Text
            style={{
              ...headingStyle,
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "28px 16px 12px",
              margin: 0,
            }}
          >
            Welcome to Studio Rapture
          </Text>

          {/* TODO: swap for the coloured banner exported from Figma */}
          <Img
            src={`${baseUrl}/rapture_emailbanner.png`}
            width="600"
            alt="Studio Rapture"
            style={{ width: "100%", height: "auto" }}
          />

          {/* The gothic pattern sits behind the bottom of the card. Outlook ignores
              background images and just shows the brown. */}
          <Section
            style={{
              backgroundImage: `url(${baseUrl}/images/FOOTER.png)`,
              backgroundPosition: "center bottom",
              backgroundSize: "100% auto",
              backgroundRepeat: "no-repeat",
              padding: "16px 16px 120px",
            }}
          >
            <Section
              style={{
                backgroundColor: cardBrown,
                border: `1px solid ${mutedGold}`,
                borderRadius: "6px",
                padding: "24px 20px",
              }}
            >
              {children}

              <Hr style={{ borderColor: mutedGold, margin: "8px 0 16px" }} />
              <Text style={{ ...textStyle, fontSize: "12px", margin: "0 0 8px" }}>Burn &amp; Fallow.</Text>
            </Section>
          </Section>
          <Img
            src={`${baseUrl}/LOGO.png`}
            width="140"
            alt="Studio Rapture Logo"
            style={{ margin: "0 auto" }}
          />
        </Container>
      </Body>
    </Html>
  );
}
