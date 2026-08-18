import type { GlobalConfig } from "payload";

export const EmailTemplates: GlobalConfig = {
    slug: "email-templates",
    access: {
        read: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
    },

    fields: [
        {
            name: "welcome",
            type: "group",
            fields: [
                {
                    name: "subject",
                    type: "text",
                    required: true,
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                },
                {
                    name: "body",
                    type: "textarea",
                    required: true,
                },
            ],
        },
        {
            name: "resetPassword",
            type: "group",
            fields: [
                {
                    name: "subject",
                    type: "text",
                    required: true,
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                },
                {
                    name: "body",
                    type: "textarea",
                    required: true,
                },
            ],
        },
        {
            name: "newSubs",
            type: "group",
            fields: [
                {
                    name: "subject",
                    type: "text",
                    required: true,
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                },
                {
                    name: "body",
                    type: "textarea",
                    required: true,
                },
            ],
        },
        {
            name: "newsUnsubs",
            type: "group",
            fields: [
                {
                    name: "subject",
                    type: "text",
                    required: true,
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                },
                {
                    name: "body",
                    type: "textarea",
                    required: true,
                },
            ],
        },
        {
            name: "newNews",
            type: "group",
            fields: [
                {
                    name: "subject",
                    type: "text",
                    required: true,
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                },
                {
                    name: "body",
                    type: "textarea",
                    required: true,
                },
            ],
        },
        {
            name: "orderConfirmation",
            type: "group",
            fields: [
                {
                    name: "subject",
                    type: "text",
                    required: true,
                },
                {
                    name: "heading",
                    type: "text",
                    required: true,
                },
                {
                    name: "body",
                    type: "textarea",
                    required: true,
                },
            ],
        },
    ],
}
