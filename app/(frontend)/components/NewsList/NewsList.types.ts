/**
 * Represents a single news entry in the news list.
 * Matches the Figma card layout: date, title, description, username, comments.
 */
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  username: string;
  commentCount?: number;
}

/* Props for the NewsList container component. */
export interface NewsListProps {
  heading?: string;
  items: NewsItem[];
  maxHeight?: string;
  height?: string;
  className?: string;
}

/* Props for the NewsCard component. */
export interface NewsCardProps {
  item: NewsItem;
  className?: string;
}
