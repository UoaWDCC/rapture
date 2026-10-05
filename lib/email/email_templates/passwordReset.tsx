import { Text } from "@react-email/components";
import { EmailLayout, textStyle } from "@/lib/email/components/EmailLayout";

type PasswordResetProps = {
  resetUrl: string;
  email?: string;
};

// Sent by Payload's forgot-password operation (see auth.forgotPassword in collections/users.tsx).
// Payload's reset tokens last 1 hour by default.
export default function PasswordReset({ resetUrl, email }: PasswordResetProps) {
  const account = email ? `the account ${email}` : "your account";

  return (
    <EmailLayout
      preview="Reset your Studio Rapture password"
      heading="Forgot your password?"
      button={{ href: resetUrl, label: "Reset password" }}
    >
      <Text style={textStyle}>
        {`It happens to the best of us.\nWe got a request to reset the password for ${account}.\n\nPress the button below to choose a new one. The link expires in 1 hour.\n\nDidn't ask for this? You can safely ignore this email and your password will stay the same.`}
      </Text>
    </EmailLayout>
  );
}
