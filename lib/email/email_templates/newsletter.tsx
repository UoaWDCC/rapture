import { Heading, Text } from "@react-email/components";
import { EmailLayout, headingStyle, textStyle } from "@/lib/email/components/EmailLayout";

type NewsletterProps = {
  text: string;
};

export default function Newsletter({ text }: NewsletterProps) {
  return (
    <EmailLayout preview="You're signed up to the Studio Rapture newsletter">
      <Heading as="h2" style={headingStyle}>
        Looking for news?
      </Heading>
      <Text style={textStyle}>{text}</Text>
    </EmailLayout>
  );
}
