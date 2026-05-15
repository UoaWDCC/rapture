import React from "react";
import "./styles.css";
import { Nova_Cut } from 'next/font/google'

import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import config from "@/payload.config";

import Navbar from "@/app/(frontend)/components/navbar.tsx";
import Footer from "./components/Footer";

const novaCut = Nova_Cut({
  subsets: ['latin'],
  weight: "400" // equivalent to weight "book"
})

export const metadata = {
  description: "Website For Studio Rapture",
  title: "Studio Rapture",
};

const itemsNav = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Games", link: "/games" },
  { id: 3, name: "News", link: "/news" },
  { id: 4, name: "Leaderboard", link: "/leaderboard" },
  { id: 5, name: "Support Us", link: "/support" }
  
]; // navbar testing

// Fill in with actual webpage links when they are done.
const navigationLinks = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Our Games", href: "/games" }
]

// Add whichever socials Rapture wants here.
const externalLinks = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Discord", href: "https://discord.com" },
  { label: "Instagram", href: "https://instagram.com" }
];

// Add any additional text.
const title = "Studio Rapture";
const text1 = "Want to be notified of our upcoming games!";
const text2 = "Make sure to follow us on our socials.";
const copyright = "© 2026 Studio Rapture. All rights reserved.";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  

  return (
    <html lang="en" className={novaCut.className}>
      <body>
        <Navbar 
          item={itemsNav} 
          user={user} 
        />

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
