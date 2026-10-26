import { Section, Text } from "@react-email/components";
import { EmailLayout, boxStyle, detailStyle, textStyle } from "@/lib/email/components/EmailLayout";

type ConfirmationFormProps = {
  name: string;
  form: string;
};

export default function ContactFormConfirmationToUser({ name, form }: ConfirmationFormProps) {
  const trimmedName = name.trim();

  return (
    <EmailLayout
      preview="We've got your message and will be in touch soon"
      heading={trimmedName ? `Thanks for reaching out, ${trimmedName}!` : "Thanks for reaching out!"}
    >
      <Text style={textStyle}>
        {"Your message has landed safely with the studio.\nWe'll get back to you as soon as we're able.\n\nHere's a copy of what you sent us:"}
      </Text>
      <Section className="rp-box" style={boxStyle}>
        <Text style={detailStyle}>{form}</Text>
      </Section>
    </EmailLayout>
  );
}
