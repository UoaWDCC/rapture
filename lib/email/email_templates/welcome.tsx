import { Text } from "@react-email/components";
import { EmailLayout, baseUrl, textStyle } from "@/lib/email/components/EmailLayout";

type WelcomeProps = {
  text: string;
};

export default function Welcome({ text }: WelcomeProps) {
  return (
    <EmailLayout
      preview="Your Studio Rapture account is ready"
      heading="Thank you for signing up!"
      signOff="So get running!"
      button={{ href: `${baseUrl}/leaderboard`, label: "Press here" }}
    >
      <Text style={textStyle}>{text}</Text>
    </EmailLayout>
  );
}
