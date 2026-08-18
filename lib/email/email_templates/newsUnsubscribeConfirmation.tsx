import { Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

export default function NewsUnsubscribeConfirmation() {
  return (
    <Html>
      <Body>
        <Heading>You have successfully unsubscribed for (r) news.</Heading>
        <Text>
          just some random text just some random text just some random text just
          some random text just some random text just some random text just some
          random text just some random text just some random text
        </Text>
      </Body>
    </Html>
  );
}
