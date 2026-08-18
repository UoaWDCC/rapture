// import { User } from "@/payload-types"; //avoid being dependant on it
import { CollectionConfig } from "payload";

/*to test email system further*/
import { sendEmail } from "@/lib/email/send_email";
import { render } from "@react-email/render";
import Welcome from "@/lib/email/email_templates/welcome";
import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";

const adminCheck = (user: any) => {
  return user?.role === "admin";
};

//avoid being dependant on it
// const adminCheck = (user: User | null) => {
//   return user?.role === "admin";
// };

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },

  access: {
    // restricting Create, Read, Update and Delete(CRUD) access for this collection
    create: () => true,
    read: ({ req: { user } }) => adminCheck(user),
    update: ({ req: { user } }) =>
      adminCheck(user) || { id: { equals: user?.id } },
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
    {
      name: "steamId",
      type: "text",
      unique: true,
      index: true,
    },
    {
      name: "newSubs",
      type: "checkbox",
      defaultValue: false,
    },
  ],

  /*sends email for new user*/
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation == "create") {
          try {
            const payload = await getPayload({ config });
            const template = await payload.findGlobal({
                slug: "email-templates",
            });
            if (!template) {
                throw new Error("Email template not found.")
            }
            const html = await render(
                React.createElement(Welcome, { 
                    name: doc.email, 
                    heading: template.welcome.heading,
                    body: template.welcome.body,
                })
            );
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
