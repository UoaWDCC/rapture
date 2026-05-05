import { SerializedEditorState } from "lexical";

export interface NewsPost {
  id: number;
  title: string;
  date: string;
  description: string;
  content: SerializedEditorState;
}

// content value is in rich text
const mockContent: SerializedEditorState = {
  root: {
    type: "root",
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
      },
      {
        type: "heading",
        tag: "h2",
        version: 1,
        children: [{ type: "text", version: 1, text: "Introduction" }],
      },
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
      },
      {
        type: "heading",
        tag: "h2",
        version: 1,
        children: [{ type: "text", version: 1, text: "Conclusion" }],
      },
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
      },
    ],
  },
} as unknown as SerializedEditorState;

const mockPost = (id: number): NewsPost => ({
  id,
  title: "Lorem ipsum dolor sit amet consectetur",
  date: new Date().toDateString(),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  content: mockContent,
});

export const MOCK_POSTS: NewsPost[] = Array.from({ length: 12 }, (_, i) =>
  mockPost(i + 1),
);
