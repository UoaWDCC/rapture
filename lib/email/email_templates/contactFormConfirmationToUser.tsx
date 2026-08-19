import { Button, Body, Html, Heading, Text } from "@react-email/components";

type ConfirmationFormProps = {
    name: string;
    form: string;
}

export default function ContactFormConfirmationToUser(prop: ConfirmationFormProps) {
    return(
        <Html>
            <Body>
                <Heading>Thank you for reaching out to us, {prop.name}!</Heading>
                <h2>We will get back to you as soon as we are able.</h2>
                <Text>just some random text just some random text just some random text
                    just some random text just some random text just some random text
                    just some random text just some random text just some random text</Text>
                <br/>
                <p>Sincerely, <br/> Rapture</p>
                <br />
                <br />
                <p>...</p>
                <h3>Message excerpt:</h3>
                <p>{prop.form}</p>
            </Body>
        </Html>
    )
}   