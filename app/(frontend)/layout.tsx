import React from "react";
import "./styles.css";
import Footer from "./components/Footer";

export const metadata = {
  description: "Website For Studio Rapture",
  title: "Studio Rapture",
};

// Fill in with actual webpage links when they are done.
const navigationLinks = [
  {label: "Home", href: "/home"},
  {label: "About", href: "/about"}, 
  {label: "Our Games", href: "/games"}
]

// Add whichever socials Rapture wants here.
const externalLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Discord", href: "https://discord.com" },
  { label: "Instagram", href: "https://instagram.com"}
];

// Add any additional text.
const title = "Studio Rapture";
const text1 = "Want to be notified of our upcoming games!";
const text2 = "Make sure to follow us on our socials.";
const copyright = "© 2026 Studio Rapture. All rights reserved.";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer 
          navigationLinks={navigationLinks}
          externalLinks={externalLinks}
          title={title}
          text1={text1}
          text2={text2}
          copyright={copyright}
        />
      </body>
    </html>
  );
}
