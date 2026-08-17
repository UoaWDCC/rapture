import { Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

export default function ResetPasswordConfirmation({ name }: { name: string }) {
  return (
    <Html>
      <Body>
        <Heading>Shh, someone had just reset your password</Heading>
        <Text>
          Hi {name},

          If this isn't you, please contact us immediately.

          Sincerely,
          ...
        </Text>
      </Body>
    </Html>
  );
}
