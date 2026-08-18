import { Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

type props = {
  name: string;
  heading: string;
  body: string;
}

export default function NewsUnsubscribeConfirmation(prop: props) {
  return (
    <Html>
      <Body>
        <Heading>{prop.heading}</Heading>
        <Text>Hello {prop.name}!</Text>
        <Text>{prop.body}</Text>
      </Body>
    </Html>
  );
}
