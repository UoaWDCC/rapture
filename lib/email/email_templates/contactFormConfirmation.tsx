import { Body, Html, Heading, Text, Img, Container, Section } from "@react-email/components";

type ConfirmationFormProps = {
  name: string;
  email: string;
  form: string;
  category?: string | "null";
};

export default function ContactFormConfirmation(prop: ConfirmationFormProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return (
    <Html>
      <Body style={{ backgroundColor: "#010C21", color: "#EEEEEE", fontFamily: "monospace", padding: "20px" }}>
        <Container>
          <Heading style={{ color: "#f2b423" }}>{prop.name} reached out.</Heading>
          <Text style={{ color: "#EEEEEE" }}>
            {prop.name}&apos;s Email to email back: {prop.email}
          </Text>
          <Text style={{ color: "#EEEEEE" }}>Category: {prop.category}</Text>
          <Heading as="h2" style={{ color: "#84AFFF" }}>Message excerpt:</Heading>
          <Text style={{ color: "#EEEEEE", whiteSpace: "pre-wrap" }}>{prop.form}</Text>

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
