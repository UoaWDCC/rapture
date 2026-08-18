import type { PayloadHandler } from "payload";
import { sendEmail } from "../send_email";

export const sendNewsNotification: PayloadHandler = async ({
    payload, input,
}) => {
    const { newsId } = input;

    const news = await payload.findByID({
        collection: "news",
        id: newsId,
    });

    const users = await payload.find({
        collection: "users",
        where: {
            newSubs: {
                equals: true,
            },
        }, limit: 1000,
    });

    for (const user of users.docs) {
        console.log(`Bringing news to ${user.email}'s door.`)
    
        try {
            await sendEmail()
        }
    }
    
    return true;
}
