import React from "react";
import "./styles.css";
import Footer from "./components/Footer";

export const metadata = {
  description: "Website For Studio Rapture",
  title: "Studio Rapture",
};

// Fill in with actual page links when they are done.
const navigationLinks = [
  {label: "Home", href: "/"},
  {label: "About", href: "/"}, 
  {label: "Our Games", href: "/"}
]

// Add whichever socials Rapture wants here.
const externalLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Discord", href: "https://discord.com" },
  { label: "Instagram", href: "https://instagram.com"}
];

// Add any additional text.
const text = "© 2026 Studio Rapture. All rights reserved.";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer 
          navigationLinks={navigationLinks}
          externalLinks={externalLinks}
          text={text}
        />
      </body>
    </html>
  );
}
