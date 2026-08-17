import { Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

export default function NewSubsConfirmation({ name }: { name: string }) {
  return (
    <Html>
      <Body>
        <Heading>Thank you for your subscription, {name}!</Heading>
        <Text>
          just some random text just some random text just some random text just
          some random text just some random text just some random text just some
          random text just some random text just some random text
        </Text>
      </Body>
    </Html>
  );
}
