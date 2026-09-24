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
  fontSize: "22px",
  fontWeight: "normal",
  textAlign: "center",
  margin: "0 0 14px",
};

export const textStyle: CSSProperties = {
  color: yellow,
  fontFamily,
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "center",
  whiteSpace: "pre-wrap",
  margin: "0 0 14px",
};

type EmailButtonProps = {
  href: string;
  children: ReactNode;
};

export function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Section style={{ textAlign: "center", margin: "8px 0 18px" }}>
      <Button
        href={href}
        style={{
          backgroundColor: yellow,
          color: darkBrown,
          fontFamily,
          fontSize: "17px",
          textTransform: "uppercase",
          padding: "13px 44px",
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
      <Body style={{ backgroundColor: "#000000", margin: 0, padding: "20px 0 0" }}>
        <Container style={{ backgroundColor: darkBrown, maxWidth: "650px", width: "100%" }}>
          <Text
            style={{
              ...headingStyle,
              textTransform: "uppercase",
              letterSpacing: "1px",
              padding: "20px 18px 12px",
              margin: 0,
            }}
          >
            Welcome to Studio Rapture
          </Text>

          {/* TODO: swap for the coloured banner exported from Figma */}
          <Img
            src={`${baseUrl}/rapture_emailbanner.png`}
            width="650"
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
              padding: "14px 18px 185px",
            }}
          >
            <Section
              style={{
                backgroundColor: cardBrown,
                border: `1px solid ${mutedGold}`,
                borderRadius: "6px",
                padding: "20px 22px",
              }}
            >
              {children}

              <Hr style={{ borderColor: mutedGold, margin: "4px 0 14px" }} />
              <Text style={{ ...textStyle, fontSize: "13px", margin: 0 }}>Burn &amp; Fallow.</Text>
            </Section>
            <Img
              src={`${baseUrl}/LOGO.png`}
              width="155"
              alt="Studio Rapture Logo"
              style={{ margin: "10px auto 0" }}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
