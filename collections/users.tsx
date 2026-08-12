import { CollectionConfig } from "payload";

/*to test email system further*/
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";

const adminCheck = (user: any) => {
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },

  access: {
    create: () => true,
    read: ({ req: { user } }) => adminCheck(user),
    update: ({ req: { user } }) => adminCheck(user) || { id: { equals: user?.id } },
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
  ],

  /*for email system testing*/
  hooks: {
    afterChange: [
      async ({doc, operation}) => {
        if (operation == "create") {
          try{
            const html = await render(<Welcome name={doc.email} />);
              await sendEmail({
              to: doc.email,
              subject: "Welcome!",
              html,
            });
          } catch (err) {
            console.error("Welcome email failed.")
          }
        }
      }
    ]
  }
};
