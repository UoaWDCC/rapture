import { Body, Html, Heading, Text, Img, Container, Section } from "@react-email/components";

type ConfirmationFormProps = {
    name: string;
    form: string;
}

export default function ContactFormConfirmationToUser(prop: ConfirmationFormProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return(
        <Html>
            <Body style={{ backgroundColor: "#010C21", color: "#EEEEEE", fontFamily: "monospace", padding: "20px" }}>
                <Container>
                    <Heading style={{ color: "#f2b423" }}>Thank you for reaching out to us, {prop.name}!</Heading>
                    <Heading as="h2" style={{ color: "#84AFFF" }}>We will get back to you as soon as we are able.</Heading>
                    <Text style={{ color: "#EEEEEE" }}>
                        Thank you for your message. Our team is looking into it.
                    </Text>
                    <br/>
                    <Text style={{ color: "#EEEEEE" }}>Sincerely, <br/> Studio Rapture</Text>
                    <br />
                    <br />
                    <Heading as="h3" style={{ color: "#84AFFF" }}>Message excerpt:</Heading>
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
    )
}
