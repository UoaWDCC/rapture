import { CollectionConfig } from "payload";

/*to test email system further*/
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";
import { User } from "@/payload-types";
import ResetPasswordEmail from "@/lib/email/email_templates/resetPassword";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    forgotPassword: {
      generateEmailHTML: async ({ token, user } = {}) => {
        if (!user || ! token) {
          throw new Error('no user/no token')
        } // error safety net if there's no user or token found
        const url = `http://localhost:3000/resetPassword?token=${token}`;
        return await render(
          <ResetPasswordEmail name={user.email || ""} url={url} />
        )
      },
      generateEmailSubject: () => "Reset Password",
    }
  }, //change auth:true with this for custom email template
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
      async ({ doc, operation }) => {
        if (operation == "create") {
          try {
            const html = await render(<Welcome name={doc.email} />);
            await sendEmail({
              to: doc.email,
              subject: "Welcome!",
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
