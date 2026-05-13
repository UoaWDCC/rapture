import { Button, Body, Html, Heading, Text } from "@react-email/components";
/*import * as React from "react";
import { Resend } from "resend";*/

export default function Welcome({ name }: { name: string}) {
    return(
        <Html>
            <Body>
                <Heading>Welcome Aboard, {name}!</Heading>
                <Text>just some random text just some random text just some random text
                    just some random text just some random text just some random text
                    just some random text just some random text just some random text</Text>
            </Body>
        </Html>
    )
}