import React from "react";
import Link from "next/link";
import styles from "./NewsHeader.module.css";
import SubscribeButton from "./SubscribeButton";

interface NewsHeaderProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  isSubscribed: boolean;
}

export default function NewsHeader({
  isAdmin,
  isLoggedIn,
  isSubscribed,
}: NewsHeaderProps) {
  return (
    <div className={styles.headerRow}>
      <div className={styles.newsfeedTitle}>
        <p className={styles.newsfeedTitleText}>RAPTURE NEWSFEED</p>
      </div>
      {isAdmin ? (
        <Link
          href="/admin/collections/News"
          className={styles.adminButton}
        >
          <span className={styles.adminButtonText}>
            {"   ADMIN - EDIT NEWS"}
          </span>
          <div className={styles.adminButtonBox} />
        </Link>
      ) : (
        <SubscribeButton
          isLoggedIn={isLoggedIn}
          isSubscribed={isSubscribed}
          className={styles.adminButton}
          labelClassName={styles.adminButtonText}
        >
          <div className={styles.adminButtonBox} />
        </SubscribeButton>
      )}
    </div>
  );
}
