import { Body, Html, Heading, Text, Img, Container, Section, Button } from "@react-email/components";

type NewsUpdateProps = {
  title: string;
  subtitle: string;
  url: string;
  imageUrl?: string;
};

export default function NewsUpdate({ title, subtitle, url, imageUrl }: NewsUpdateProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <Html>
      <Body style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <Container>
          <Text style={{ textTransform: "uppercase", letterSpacing: "2px", color: "#888888" }}>
            New from Studio Rapture
          </Text>
          <Heading>{title}</Heading>
          {imageUrl && (
            <Section>
              <Img src={imageUrl} width="560" alt={title} style={{ maxWidth: "100%", height: "auto" }} />
            </Section>
          )}
          <Section>
            <Text style={{ whiteSpace: "pre-wrap" }}>{subtitle}</Text>
          </Section>
          <Section style={{ marginTop: "20px" }}>
            <Button
              href={url}
              style={{ backgroundColor: "#F2B423", color: "#000000", padding: "12px 24px" }}
            >
              Read more
            </Button>
          </Section>
          <Section style={{ marginTop: "40px" }}>
            <Img src={`${baseUrl}/LOGO.png`} width="200" alt="Studio Rapture Logo" />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
