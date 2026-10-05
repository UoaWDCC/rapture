import { Body, Html, Heading, Text } from "@react-email/components";

export default function ResetPasswordEmail({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <Html>
      <Body>
        <Heading>Password Reset Request</Heading>
        <Text>Hi, {name},</Text>
        <Text>
          Here is the <a href={url}>link</a> to direct you to the reset password
          page.
        </Text>
        <Text>If the request wasn\&apos;t from you, just ignore.</Text>
        <Text>Thank you.</Text>
        <Text>
          just some random text just some random text just some random text just
          some random text just some random text just some random text just some
          random text just some random text just some random text
        </Text>
      </Body>
    </Html>
  );
}
