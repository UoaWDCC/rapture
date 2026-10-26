import React from "react";
import Image from "next/image";
import type { News } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import styles from "./NewsFeedCard.module.css";

/** Format a date string as "D/M/YY" */
function formatShortDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  return `${day}/${month}/${year}`;
}

export default function NewsFeed({
  news,
  onReadMore,
  isExpanded,
}: {
  news: News;
  onReadMore: () => void;
  isExpanded?: boolean;
}) {
  const image =
    typeof news.image === "object" && news.image !== null ? news.image : null;

  return (
    <article aria-label={news.title} className="mb-[9.5px] md:mb-4 w-full">
      {/* MOBILE LAYOUT */}
      <div className={styles.mobileLayout}>
        {/* Horizontal center lines — split into segments to avoid bleeding through the semi-transparent amber panel/gray card */}
        <div className={styles.lineLeft} />
        <div className={styles.lineAmberToDate} />
        <div className={styles.lineDateToBox} />
        <div className={styles.lineBoxToEdge} />

        {/* Flat amber rectangle (no radius) — sits behind curved panel, square corners peek out from behind rounded corners */}
        <div className={styles.amberRectFlat} />

        {/* Amber curved rectangle panel */}
        <div className={styles.amberPanel}>
          {/* Gray inner card with text content */}
          <div className={styles.innerCard}>
            {/* Subtitle with bullet dot */}
            {news.subtitle && (
              <div className={styles.subtitleRow}>
                <span className={styles.bullet} />
                <span className={styles.subtitleText}>{news.subtitle}</span>
              </div>
            )}

            {/* Title */}
            <h3 className={styles.cardTitle}>{news.title}</h3>

            {/* Description — max 3 lines on mobile, un-clamped when expanded */}
            <div
              className={`${styles.cardDescription} ${isExpanded ? styles.expanded : ""}`}
            >
              <RichText data={news.description} />
            </div>

            {/* Image revealed at bottom when expanded */}
            {isExpanded && image?.url && (
              <div className={styles.expandedImageWrapper}>
                <Image
                  src={image.url}
                  alt={image.alt || news.title}
                  width={image.width || 600}
                  height={image.height || 400}
                  className={styles.expandedImage}
                />
              </div>
            )}
          </div>

          {/* Read More button */}
          <button
            type="button"
            onClick={onReadMore}
            className={styles.readMoreBtn}
            aria-expanded={isExpanded}
          >
            <span className={styles.readMoreCircle}>
              <span className={styles.readMoreDot} />
            </span>
            <span className={styles.readMoreLabel}>
              {isExpanded ? "Show Less" : "Read More"}
            </span>
          </button>
        </div>

        {/* Date badge — vertical rotated text */}
        <div className={styles.dateBadge}>
          <span className={styles.dateText}>
            {formatShortDate(news.date)}
          </span>
        </div>

        {/* Black box — far right */}
        <div className={styles.blackBox} />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className={styles.desktopLayout}>
        {/* Horizontal center lines across gaps */}
        <div className={styles.desktopLineLeft} />
        <div className={styles.desktopLineAmberToDate} />
        <div className={styles.desktopLineDateToBox} />
        <div className={styles.desktopLineBoxToEdge} />

        {/* Flat amber rectangle (no radius) */}
        <div className={styles.desktopAmberRectFlat} />

        {/* Amber curved rectangle panel */}
        <div className={styles.desktopAmberPanel}>
          {/* Gray inner card */}
          <div className={styles.desktopInnerCard}>
            {/* Left text area */}
            <div className={styles.desktopTextArea}>
              {/* Subtitle with bullet dot */}
              {news.subtitle && (
                <div className={styles.desktopSubtitleRow}>
                  <span className={styles.desktopBullet} />
                  <span className={styles.desktopSubtitleText}>
                    {news.subtitle}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className={styles.desktopCardTitle}>{news.title}</h3>

              {/* Description */}
              <div
                className={`${styles.desktopCardDescription} ${
                  isExpanded ? styles.desktopExpanded : ""
                }`}
              >
                <RichText data={news.description} />
              </div>
            </div>

            {/* Right image container */}
            {image?.url && (
              <div className={styles.desktopImageContainer}>
                <Image
                  src={image.url}
                  alt={image.alt || news.title}
                  width={image.width || 600}
                  height={image.height || 400}
                  className={styles.desktopImage}
                />
              </div>
            )}
          </div>

          {/* Read More button */}
          <button
            type="button"
            onClick={onReadMore}
            className={styles.desktopReadMoreBtn}
            aria-expanded={isExpanded}
          >
            <span className={styles.desktopReadMoreCircleWrapper}>
              <span className={styles.desktopPlayIcon}>
                <Image
                  src="/images/news-play-icon.png"
                  alt=""
                  width={15}
                  height={15}
                  unoptimized
                />
              </span>
              <span className={styles.desktopReadMoreCircle}>
                <span className={styles.desktopReadMoreDot} />
              </span>
            </span>
            <span className={styles.desktopReadMoreLabel}>
              {isExpanded ? "Show Less" : "Read More"}
            </span>
          </button>
        </div>

        {/* Date badge */}
        <div className={styles.desktopDateBadge}>
          <span className={styles.desktopDateText}>
            {formatShortDate(news.date)}
          </span>
        </div>

        {/* Black box — far right */}
        <div className={styles.desktopBlackBox} />
      </div>
    </article>
  );
}
