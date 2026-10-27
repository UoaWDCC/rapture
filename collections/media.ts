import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
    slug: "media",
    upload: true,
    // Images are shown on public pages (products, news, donors), so anyone may view them.
    // Uploading, editing and deleting still require a logged-in user.
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "alt",
            type: "text",
        },
    ],
}