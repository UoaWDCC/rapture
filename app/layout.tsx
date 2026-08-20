import React from "react";
import "./(frontend)/styles.css";

import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Fira_Mono, Nova_Cut } from "next/font/google";

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  return (
    <html lang="en" className={`${firaMono.variable} ${novaCut.variable}`}>
      <body>

        <main>{children}</main>
        
      </body>
    </html>
  );
}
