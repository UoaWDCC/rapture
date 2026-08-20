"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import NewsFeed from "./newsfeed";
import styles from "./newsTabs.module.css";
import GlitchReveal from "../../components/GlitchReveal";

import type { News } from "@/payload-types";

const VISIBLE_CARDS = 3;
const TRACK_PADDING = 10;
/* Matches the 0.15s stagger the Home page sections use. */
const REVEAL_STAGGER = 0.15;

export default function NewsTabs({
  allNews,
  expandedArticleId,
}: {
  allNews: News[];
  expandedArticleId?: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  /* Store thumb dimensions in refs so recalc() never calls setState */
  const thumbHeightRef = useRef(0);
  const thumbTopRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartTop, setDragStartTop] = useState(0);

  const initialNews = expandedArticleId
    ? (allNews.find((n) => String(n.id) === expandedArticleId) ?? null)
    : null;

  const [expandedId, setExpandedId] = useState<string | null>(
    initialNews?.id ? String(initialNews.id) : null,
  );

  const shouldScroll = allNews.length > VISIBLE_CARDS;

  /**
   * Measures the DOM and updates styles imperatively (no setState).
   * This avoids the React 19 "cascading renders" warning.
   */
  const recalc = useCallback(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!el) return;

    /* ---- Dynamic max-height based on first 3 cards ---- */
    const children = Array.from(el.children);
    if (children.length > VISIBLE_CARDS) {
      let exactHeight = 0;
      for (let i = 0; i < VISIBLE_CARDS; i++) {
        exactHeight += (children[i] as HTMLElement).offsetHeight;
      }
      el.style.maxHeight = `${exactHeight}px`;
    }

    /* ---- Scrollbar visibility & thumb sizing ---- */
    const overflows = el.scrollHeight > el.clientHeight;

    if (track) {
      track.style.display = overflows ? "" : "none";
    }

    if (!overflows || !track || !thumb) return;

    const trackH = track.clientHeight - TRACK_PADDING;
    const ratio = el.clientHeight / el.scrollHeight;
    const newThumbH = Math.max(ratio * trackH, 30);
    thumbHeightRef.current = newThumbH;
    thumb.style.height = `${newThumbH}px`;

    const scrollRatio =
      el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
    const newThumbTop = scrollRatio * (trackH - newThumbH);
    thumbTopRef.current = newThumbTop;
    thumb.style.top = `${newThumbTop + 5}px`;
  }, []);

  /* ---- Run recalc on mount, data change, and resize ---- */
  useEffect(() => {
    /* Defer to next frame so the DOM has painted the children */
    const raf = requestAnimationFrame(recalc);
    window.addEventListener("resize", recalc);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recalc);
    };
  }, [allNews, expandedId, recalc]);

  /* ---- Sync thumb position on content scroll ---- */
  const handleScroll = () => recalc();

  /* ---- Drag-to-scroll on thumb ---- */
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartTop(thumbTopRef.current);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      const el = scrollRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!el || !track || !thumb) return;

      const trackH = track.clientHeight - TRACK_PADDING;
      const currentThumbH = thumbHeightRef.current;
      const delta = e.clientY - dragStartY;
      const newTop = Math.min(
        Math.max(dragStartTop + delta, 0),
        trackH - currentThumbH,
      );
      thumbTopRef.current = newTop;
      thumb.style.top = `${newTop + 5}px`;

      const scrollRatio = newTop / (trackH - currentThumbH || 1);
      el.scrollTop = scrollRatio * (el.scrollHeight - el.clientHeight);
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, dragStartY, dragStartTop]);

  /* ---- Render ---- */
  if (allNews.length === 0) {
    return (
      <div className="my-7.5">
        <div className={styles.emptyState}>
          <p>No news to display yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-7.5">
      <div className={styles.newsContainer}>
      <div
        ref={scrollRef}
        className={`${styles.scrollableArea} ${
          !shouldScroll ? styles.noOverflow : ""
        }`}
        onScroll={handleScroll}
      >
        {allNews.map((item, index) => (
          /*
           * Only the cards visible on load are staggered. Cards further down
           * reveal as they are scrolled into the window, so an inherited delay
           * would just make them feel sluggish.
           */
          <GlitchReveal
            key={item.id}
            delay={index < VISIBLE_CARDS ? index * REVEAL_STAGGER : 0}
            amount={0.2}
          >
            <NewsFeed
              news={item}
              onReadMore={() =>
                setExpandedId(
                  expandedId === String(item.id) ? null : String(item.id),
                )
              }
              isExpanded={expandedId === String(item.id)}
            />
          </GlitchReveal>
        ))}
      </div>

      <div
        ref={trackRef}
        className={styles.scrollbarTrack}
        style={{ display: "none" }}
      >
        <div
          ref={thumbRef}
          className={styles.scrollbarThumb}
          onMouseDown={startDrag}
        />
      </div>
    </div>
    </div>
  );
}
