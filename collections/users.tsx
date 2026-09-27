import { CollectionConfig } from "payload";

/*to test email system further*/
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";
import PasswordReset from "@/lib/email/email_templates/passwordReset";
import { baseUrl } from "@/lib/email/components/EmailLayout";
import { User } from "@/payload-types";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    forgotPassword: {
      generateEmailSubject: () => "Reset your Studio Rapture password",
      generateEmailHTML: async (args) =>
        render(
          <PasswordReset
            resetUrl={`${baseUrl}/change-password?token=${args?.token}`}
            email={args?.user?.email}
          />,
        ),
    },
  },
  admin: {
    useAsTitle: "email",
  },

  access: {
    create: () => true,
    read: ({ req: { user } }) => adminCheck(user),
    update: ({ req: { user } }) =>
      adminCheck(user) || { id: { equals: user?.id } },
    delete: ({ req: { user } }) => adminCheck(user),

    admin: ({ req: { user } }) => adminCheck(user),
  },

  fields: [
    {
      name: "email",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "user",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "steamId",
      type: "text",
      unique: true,
      index: true,
    },
  ],

  /*for email system testing*/
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation == "create") {
          try {
            const settings = await req.payload.findGlobal({ slug: "emailSettings" }) as { welcomeEmailText?: string };
            const text = settings?.welcomeEmailText || "Welcome!";
            const html = await render(<Welcome text={text} />);
            await sendEmail({
              to: doc.email,
              subject: "Welcome to Studio Rapture",
              html,
            });
          } catch (err) {
            console.error("Welcome email failed.");
          }
        }
      },
    ],
  },
};
