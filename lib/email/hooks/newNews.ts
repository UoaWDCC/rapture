import type { CollectionAfterChangeHook } from "payload";
import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { render } from "@react-email/render"; 
import newNewsAlert from "../email_templates/newNewsAlert";

export const newNews: CollectionAfterChangeHook = async ({
    doc, previousDoc, operation, req
}) => {
    console.log("NEWS HOOK RAN");
console.log("Operation:", operation);
console.log("Previous status:", previousDoc?._status);
console.log("Current status:", doc._status);

    const payload = await getPayload({ config });
    const wasPublished = previousDoc?._status === 'published';
    const isPublished = doc._status === 'published';

    const justPublished = !wasPublished && isPublished;

    const template = await payload.findGlobal({
        slug: "email-templates",
    });

    if (!template) {
        throw new Error("Email template not found.")
    }

    {/* send only when news is publshed, not again when edited */}
    if (justPublished) {
        return doc;
    }

    const users = await req.payload.find({
        collection: "users",
        where: {
            newSubs: {
                equals: true,
            },
        }, limit: 1000,
    });

    for (const user of users.docs) {
        try {
            const html = await render(
                React.createElement(newNewsAlert, { 
                    name: user.email, 
                    heading: template.newNews.heading,
                    body: template.newNews.body,
                    title: doc.title,
                    subtitle: doc.subtitle,
                })
            );
            await req.payload.sendEmail({
                to: user.email,
                subject: `New (r) News! ${doc.title}`,
                html,
            });

            console.log(`News "${doc.title} was just publised.`);
        } catch (error) {
            console.error("Failed to send new news email:", error);
        }
    }

    

    // await req.payload.jobs.queue({
    //     task: "sendNewsNotification",
    //     input: {
    //         newsId: doc.id,
    //     },
    // });

    return doc;
}