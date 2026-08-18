import { Body, Html, Heading, Text } from "@react-email/components";

export default function ForgotPassword({ code }: { code: string }) {
    return (
        <Html>
            <Body>
                <Heading>Reset Your Password</Heading>
                <Text>
                    Use this code to reset your password:
                </Text>
                <Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {code}
                </Text>
                <Text>
                    If you didn't request this, you can ignore this email.
                </Text>
            </Body>
        </Html>
    );
}