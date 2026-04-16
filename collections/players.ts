import type { CollectionConfig } from "payload";

export const Players: CollectionConfig = {
  slug: "Players",
  // What is stored in this collection
  fields: [
    {
      name: "userId", //decided to go with userId instead of email to avoid signing in, can be changed if needed
      type: "text",
    },
    {
      name: "score",
      type: "number",
    },
  ],
};
