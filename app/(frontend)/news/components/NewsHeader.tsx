import React from "react";
import Link from "next/link";
import styles from "./NewsHeader.module.css";

interface NewsHeaderProps {
  isAdmin: boolean;
}

export default function NewsHeader({ isAdmin }: NewsHeaderProps) {
  return (
    <div className={styles.headerRow}>
      <div className={styles.newsfeedTitle}>
        <p className={styles.newsfeedTitleText}>RAPTURE NEWSFEED</p>
      </div>
      {isAdmin && (
        <Link
          href="/admin/collections/News"
          className={styles.adminButton}
        >
          <span className={styles.adminButtonText}>
            {"   ADMIN - EDIT NEWS"}
          </span>
          <div className={styles.adminButtonBox} />
        </Link>
      )}
    </div>
  );
}
