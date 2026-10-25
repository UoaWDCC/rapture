import { Link, Section, Text } from "@react-email/components";
import { EmailLayout, boxStyle, detailStyle, linkStyle, mutedGold, textStyle } from "@/lib/email/components/EmailLayout";

type ConfirmationFormProps = {
  name: string;
  email: string;
  form: string;
  category?: string;
};

// Values from the <select> in app/(frontend)/components/ContactForm.tsx
const categoryLabels: Record<string, string> = {
  general: "General Inquiry",
  support: "Support",
  business: "Business",
};

const labelStyle = { color: mutedGold, textShadow: "none" };

// Sent to the studio when someone uses the contact form
export default function ContactFormConfirmation({ name, email, form, category }: ConfirmationFormProps) {
  const trimmedName = name.trim() || "Someone";
  const categoryLabel = (category && categoryLabels[category]) || category || "Not specified";

  return (
    <EmailLayout
      title="Studio Rapture"
      preview={`New ${categoryLabel.toLowerCase()} enquiry from ${trimmedName}`}
      heading={`${trimmedName} reached out`}
      button={{
        href: `mailto:${email}?subject=${encodeURIComponent("Re: your message to Studio Rapture")}`,
        label: "Reply",
      }}
    >
      <Text style={{ ...textStyle, margin: "0 0 4px" }}>
        <span style={labelStyle}>Email: </span>
        <Link href={`mailto:${email}`} style={linkStyle}>
          {email}
        </Link>
      </Text>
      <Text style={textStyle}>
        <span style={labelStyle}>Category: </span>
        {categoryLabel}
      </Text>
      <Section className="rp-box" style={boxStyle}>
        <Text style={detailStyle}>{form}</Text>
      </Section>
    </EmailLayout>
  );
}
