import { Img, Text } from "@react-email/components";
import {
  EmailLayout,
  baseUrl,
  textStyle,
} from "@/lib/email/components/EmailLayout";

type NewsUpdateProps = {
  title: string;
  subtitle: string;
  // Link to the full post, e.g. `${baseUrl}/news/${id}`
  url: string;
  imageUrl?: string;
  date?: string | Date;
};

// Sent to newsletter subscribers when a new News post goes up
export default function NewsUpdate({
  title,
  subtitle,
  url,
  imageUrl,
  date,
}: NewsUpdateProps) {
  const imageSrc =
    imageUrl &&
    (imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`);
  const dateText =
    date &&
    new Date(date).toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <EmailLayout
      preview={`Fresh from the studio: ${title}`}
      heading={title}
      button={{ href: url, label: "Read more" }}
    >
      {imageSrc && (
        <Img
          src={imageSrc}
          width="502"
          alt={title}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            borderRadius: "3px",
            margin: "4px 0 16px",
          }}
        />
      )}
      {dateText && (
        <Text
          style={{
            ...textStyle,
            fontSize: "12px",
            margin: "0 0 8px",
            opacity: 0.8,
          }}
        >
          {dateText}
        </Text>
      )}
      <Text style={textStyle}>{subtitle}</Text>
    </EmailLayout>
  );
}
