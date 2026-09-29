import { Body, Html, Heading, Text, Img, Container, Section } from "@react-email/components";

type NewsletterProps = {
  text: string;
};

export default function Newsletter({ text }: NewsletterProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <Html>
      <Body style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <Container>
          <Heading>Welcome to the Newsletter!</Heading>
          <Section>
            <Text style={{ whiteSpace: "pre-wrap" }}>
              {text}
            </Text>
          </Section>
          <Section style={{ marginTop: "40px" }}>
            <Img
              src={`${baseUrl}/LOGO.png`}
              width="200"
              alt="Studio Rapture Logo"
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
