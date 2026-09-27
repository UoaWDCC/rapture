import type { ReactElement } from "react";
import { baseUrl } from "@/lib/email/components/EmailLayout";
import Welcome from "@/lib/email/email_templates/welcome";
import Newsletter from "@/lib/email/email_templates/newsletter";
import ContactFormConfirmationToUser from "@/lib/email/email_templates/contactFormConfirmationToUser";
import ContactFormConfirmation from "@/lib/email/email_templates/contactFormConfirmation";
import PasswordReset from "@/lib/email/email_templates/passwordReset";
import Purchase from "@/lib/email/email_templates/purchase";
import NewsUpdate from "@/lib/email/email_templates/newsUpdate";

// Example data for every email, used by the preview and test-email routes.
// Texts that admins can edit fall back to the EmailSettings defaults.
export type EmailSettingsText = {
  welcomeEmailText?: string;
  newsletterEmailText?: string;
  purchaseEmailText?: string;
  adminPurchaseEmailText?: string;
};

const sampleItems = [
  { productName: "VITRIOL (Steam Key)", price: 24.99, quantity: 1 },
  { productName: "Burn & Fallow Tee", price: 39.5, quantity: 2 },
];
const sampleTotal = 24.99 + 39.5 * 2;

const sampleMessage =
  "Hi team,\n\nI finished an arcade run last night but my score didn't show up on the leaderboard. Is there something I need to do to link my account?\n\nThanks!";

export const sampleEmails: Record<string, { subject: string; render: (s: EmailSettingsText) => ReactElement }> = {
  welcome: {
    subject: "Welcome to Studio Rapture",
    render: (s) => (
      <Welcome
        text={
          s.welcomeEmailText ||
          "VITRIOL is our primary concern, and you have just unlocked the ability to upload your ARCADE MODE SCORES to our website using this account after completing an arcade run!"
        }
      />
    ),
  },
  newsletter: {
    subject: "You're subscribed to Studio Rapture news",
    render: (s) => (
      <Newsletter
        text={
          s.newsletterEmailText ||
          "Well thank you for signing up to the newsletter!\nYou've made the right choice.\n\nEverything you need to know about STUDIO RAPTURE! News on our games that were, are not, and are to come.\n\nRight here. Straight to your inbox."
        }
      />
    ),
  },
  contactUser: {
    subject: "Thank you for reaching out!",
    render: () => <ContactFormConfirmationToUser name="Alex Taylor" form={sampleMessage} />,
  },
  contactAdmin: {
    subject: "Alex Taylor reached out.",
    render: () => (
      <ContactFormConfirmation name="Alex Taylor" email="alex@example.com" category="support" form={sampleMessage} />
    ),
  },
  passwordReset: {
    subject: "Reset your Studio Rapture password",
    render: () => (
      <PasswordReset resetUrl={`${baseUrl}/change-password?token=example-token`} email="alex@example.com" />
    ),
  },
  purchase: {
    subject: "Order Confirmation",
    render: (s) => (
      <Purchase
        text={s.purchaseEmailText || "Thank you for purchasing! Here are your items:"}
        items={sampleItems}
        totalPrice={sampleTotal}
        orderId="66f7c1a9e4b0a1b2c3d4e5f6"
        orderDate={new Date()}
      />
    ),
  },
  purchaseAdmin: {
    subject: "New Order Received",
    render: (s) => (
      <Purchase
        text={s.adminPurchaseEmailText || "A new purchase has been made. Details below:"}
        items={sampleItems}
        totalPrice={sampleTotal}
        purchaserEmail="alex@example.com"
        orderId="66f7c1a9e4b0a1b2c3d4e5f6"
        orderDate={new Date()}
      />
    ),
  },
  news: {
    subject: "New from Studio Rapture: VITRIOL Arcade Mode is live",
    render: () => (
      <NewsUpdate
        title="VITRIOL Arcade Mode is live"
        subtitle="Leaderboards are open. Post your best arcade run, climb the ranks and see who burns brightest."
        url={`${baseUrl}/news`}
        imageUrl="/images/vitriol-hero.png"
        date={new Date()}
      />
    ),
  },
};
