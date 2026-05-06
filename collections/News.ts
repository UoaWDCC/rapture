import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "News", // Collection Name
  // What is stored in this collection
  timestamps: true,
  fields: [
    { 
      name: "title",
      type: "text",
      required: true,
      validate: (value) => {
        if (!value || !value.trim()) {
          return "Title cannot be empty";
        }
        return true;
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      validate: (value) => {
        if (!value || !value.trim()) { // if want minimum description instead: value.trim().length < min_length
          return "Description cannot be empty";
        }
        return true;
      },
    },
  ],
};
