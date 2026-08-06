"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./NewsList.module.css";
import NewsCard from "./NewsCard";
import type { NewsListProps } from "./NewsList.types";

/* NewsList — Scrollable news container matching the Figma design. */
export default function NewsList({
  heading = "Rapture Player Updates",
  items,
  maxHeight = "595px",
  height,
  className,
}: NewsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  /* Checks whether the scroll container's content exceeds its visible height. */
  const checkOverflow = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setIsOverflowing(el.scrollHeight > el.clientHeight);
  }, []);

  /* Updates scrollbar visibility when items change. */
  useEffect(() => {
    checkOverflow();
  }, [items, checkOverflow]);

  useEffect(() => {
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

  return (
    <div className={`${styles.newsListOuter} ${className ?? ""}`} id="news-list">
      <div className={styles.newsListHeading}>
        <h2 className={styles.newsListHeadingText}>{heading}</h2>
      </div>

      <div
        ref={containerRef}
        className={`${styles.newsListContainer} ${
          !isOverflowing ? styles.noOverflow : ""
        }`}
        style={{ maxHeight, height }}
        role="feed"
        aria-label={heading}
      >
        {items.length === 0 ? (
          <div className={styles.newsListEmpty}>
            <p>No news to display yet.</p>
          </div>
        ) : (
          items.map((item) => <NewsCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
