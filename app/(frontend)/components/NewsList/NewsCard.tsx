import React from "react";
import styles from "./NewsList.module.css";
import type { NewsCardProps } from "./NewsList.types";

/* NewsCard — Renders a single news entry matching the Figma design. */
export default function NewsCard({ item, className }: NewsCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className={`${styles.newsCard} ${className ?? ""}`}
      id={`news-card-${item.id}`}
    >
      <div className={styles.newsCardBody}>
        <p className={styles.newsCardDate}>{formattedDate}</p>
        <h3 className={styles.newsCardTitle}>{item.title}</h3>
        <p className={styles.newsCardDescription}>{item.description}</p>
      </div>

      <div className={styles.newsCardDivider} />

      <div className={styles.newsCardFooter}>
        <span className={styles.newsCardUsername}>{item.username}</span>
        <div className={styles.newsCardComment}>
          <button type="button" className={styles.newsCardCommentBtn}>Make a comment</button>
          <span>|</span>
          <span>{item.commentCount ?? 0}</span>
        </div>
      </div>
    </article>
  );
}
