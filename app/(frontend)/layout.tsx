import React from "react";
import "./styles.css";
import { Nova_Cut } from 'next/font/google'

import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Fira_Mono, Nova_Cut } from "next/font/google";

import Navbar from "@/app/(frontend)/components/navbar.tsx";
import Footer from "./components/Footer";

const firaMono = Fira_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-mono",
});

const novaCut = Nova_Cut({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nova-cut",
});

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
const studioTagline = "Tagline example";
const contactEmail = "contact@gmail.com";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  

  return (
    <html lang="en" className={`${firaMono.variable} ${novaCut.variable}`}>
      <body>
        <Navbar 
          item={itemsNav} 
          user={user} 
        />

        <main>{children}</main>
        
        <Footer
          studioTagline={studioTagline}
          contactEmail={contactEmail}
        />
      </body>
    </html>
  );
}
