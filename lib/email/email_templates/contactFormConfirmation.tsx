import { Button, Body, Html, Heading, Text } from "@react-email/components";

type ConfirmationFormProps = {
  name: string;
  email: string;
  form: string;
  category?: string | "null";
};

export default function ContactFormConfirmation(prop: ConfirmationFormProps) {
  return (
    <Html>
      <Body>
        <Heading>{prop.name} reached out.</Heading>
        <p>
          {prop.name}\&apos;s Email to email back: {prop.email}
        </p>
        <p>Category: {prop.category}</p>
        <h2>Message excerpt:</h2>
        <p>{prop.form}</p>
      </Body>
    </Html>
  );
}
