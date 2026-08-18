import type { CollectionAfterChangeHook } from "payload";
import React from "react";
import { render } from "@react-email/render"; 
import newNewsAlert from "../email_templates/newNewsAlert";

export const newNews: CollectionAfterChangeHook = async ({
    doc, previousDoc, operation, req
}) => {
    const wasPublished = previousDoc?._status === 'published';
    const isPublished = doc._status === 'published';

    const justPublished = (operation === "create" && isPublished);
    
    if (!justPublished) {
        return doc;
    }

    {/* send only when news is publshed, not again when edited */}
    if (previousDoc?._status === 'published') {
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

    const html = await render(
        React.createElement(newNewsAlert, { title: doc.title, subtitle: doc.subtitle })
    );

    for (const user of users.docs) {
        try {
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