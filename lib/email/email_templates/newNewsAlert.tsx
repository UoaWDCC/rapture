import { Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

type newsProps = {
    title: string,
    subtitle: string,
    name: string;
    heading: string;
    body: string;
}

export default function newNewsAlert(prop: newsProps) {
  return (
    <Html>
      <Body>
        <Heading>{prop.heading}</Heading>
        <Text>Hello {prop.name}!</Text>
        <Text>{prop.body}</Text>
        
        <br/>
        <h3>{prop.title}</h3>
        <Text>{prop.subtitle}</Text>
        <br/>
        
      </Body>
    </Html>
  );
}
