import { Text } from "@react-email/components";
import { EmailLayout, textStyle } from "@/lib/email/components/EmailLayout";

type NewsletterProps = {
  text: string;
};

export default function Newsletter({ text }: NewsletterProps) {
  return (
    <EmailLayout preview="You're signed up to the Studio Rapture newsletter" heading="Looking for news?">
      <Text style={textStyle}>{text}</Text>
    </EmailLayout>
  );
}
