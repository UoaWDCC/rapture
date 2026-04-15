import React from "react";
import "./styles.css";
import Footer from "./components/Footer.tsx";

export const metadata = {
  description: "Website For Studio Rapture",
  title: "Studio Rapture",
};

const externalLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Discord", href: "https://discord.com" },
];

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer 
          externalLinks={externalLinks}
          text="© 2026 Studio Rapture. All rights reserved."
        />
      </body>
    </html>
  );
}
