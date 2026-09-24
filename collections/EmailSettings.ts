import { GlobalConfig } from "payload";

export const EmailSettings: GlobalConfig = {
  slug: "emailSettings",
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "welcomeEmailText",
      type: "textarea",
      required: true,
      defaultValue: "Thank you for signing up!\nVITRIOL is our primary concern, and you have just unlocked the ability to upload your ARCADE MODE SCORES to our website using this account after completing an arcade run!\nSo get running!\n\nBurn & Fallow.",
      label: "Welcome Email Content",
    },
    {
      name: "newsletterEmailText",
      type: "textarea",
      required: true,
      defaultValue: "Well thank you for signing up to the newsletter!\nYou've made the right choice.\n\nEverything you need to know about STUDIO RAPTURE! News on our games that were, are not, and are to come.\n\nRight here. Straight to your inbox.",
      label: "Newsletter Email Content",
    },
    {
      name: "purchaseEmailText",
      type: "textarea",
      required: true,
      defaultValue: "Thank you for purchasing! Here are your items:",
      label: "Purchase Email Content (To User)",
    },
    {
      name: "adminPurchaseEmailText",
      type: "textarea",
      required: true,
      defaultValue: "A new purchase has been made. Details below:",
      label: "Purchase Email Content (To Admin)",
    }
  ],
};
