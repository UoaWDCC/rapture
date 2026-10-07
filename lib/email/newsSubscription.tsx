import type { Payload } from "payload";
import { render } from "@react-email/render";

import type { News } from "@/payload-types";
import { sendEmail, sendBatchEmails } from "@/lib/email/send_email";
import Newsletter from "@/lib/email/email_templates/newsletter";
import NewsUpdate from "@/lib/email/email_templates/newsUpdate";

const baseUrl = () => process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/** Confirmation email sent when a user subscribes to news. */
export async function sendSubscribeConfirmation(payload: Payload, to: string) {
  const settings = (await payload.findGlobal({ slug: "emailSettings" })) as {
    newsletterEmailText?: string;
  };
  const text = settings?.newsletterEmailText || "Thanks for subscribing to Studio Rapture news!";
  const html = await render(<Newsletter text={text} />);

  return sendEmail({
    to,
    subject: "You're subscribed to Studio Rapture news",
    html,
  });
}

/** Resolves the news image to an absolute URL (media URLs are relative). */
async function getImageUrl(payload: Payload, image: News["image"]): Promise<string | undefined> {
  try {
    const media =
      typeof image === "string"
        ? await payload.findByID({ collection: "media", id: image, depth: 0 })
        : image;
    const url = media?.url;
    if (!url) return undefined;
    return url.startsWith("http") ? url : `${baseUrl()}${url}`;
  } catch {
    return undefined;
  }
}

/** Emails every subscribed user about a newly created news post. */
export async function sendNewsUpdateToSubscribers(payload: Payload, news: News) {
  const subscribers = await payload.find({
    collection: "users",
    where: { newsSubscribed: { equals: true } },
    pagination: false,
    depth: 0,
    select: { email: true },
  });

  const emails = subscribers.docs.map((u) => u.email).filter(Boolean);
  if (emails.length === 0) return;

  const html = await render(
    <NewsUpdate
      title={news.title}
      subtitle={news.subtitle}
      url={`${baseUrl()}/news?article=${news.id}`}
      imageUrl={await getImageUrl(payload, news.image)}
    />,
  );

  // One email per subscriber so addresses are never exposed to each other.
  await sendBatchEmails(
    emails.map((to) => ({ to, subject: `News: ${news.title}`, html })),
  );

  payload.logger.info(`News update "${news.title}" sent to ${emails.length} subscriber(s).`);
}
