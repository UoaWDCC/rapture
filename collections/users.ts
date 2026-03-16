import { User } from "@/payload-types";
import { CollectionConfig } from "payload";

const adminCheck = (user: User | null) => {
  return user?.role === "admin";
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,

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
};
