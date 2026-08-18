import { Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

type newsProps = {
    title: string,
    subtitle: string,
}

export default function newNewsAlert(prop: newsProps) {
  return (
    <Html>
      <Body>
        <Heading>New Lore Dropped!</Heading>
        <h2>We heard that you might be interested in this...</h2>
        
        <br/>
        <h3>{prop.title}</h3>
        <Text>{prop.subtitle}</Text>
        <br/>
        
        <Text>
          just some random text just some random text just some random text just
          some random text just some random text just some random text just some
          random text just some random text just some random text

          You are subscribed to receive (r)'s newest news. 
        </Text>
      </Body>
    </Html>
  );
}
