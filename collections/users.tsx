import { User } from "@/payload-types";
import { CollectionConfig } from "payload";

/*to test email system further*/
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },

  access: {
    // restricting Create, Read, Update and Delete(CRUD) access for this collection
    create: ({ req: { user } }) => adminCheck(user),
    read: ({ req: { user } }) => adminCheck(user),
    update: ({ req: { user } }) => adminCheck(user),
    delete: ({ req: { user } }) => adminCheck(user),

    admin: ({ req: { user } }) => adminCheck(user), // Whether a user from this collection can access the admin panel or not
  },

  fields: [
    {
      name: "email",
      type: "email",
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
            const html = await render(<Welcome name={doc.name} />);
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
