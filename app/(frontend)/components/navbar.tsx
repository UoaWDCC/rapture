"use client";

import { User } from "@/payload-types";
import { usePathname } from "next/navigation";
import { Nova_Cut } from "next/font/google";
import Image from "next/image";

const novaCut = Nova_Cut({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nova-cut",
});

type itemNav = {
  id: number;
  name: string;
  link: string;
}

type NavProps = {
  item: itemNav[];
  user: User | null;
}

export default function Navbar({item}: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full flex flex-row flex-wrap items-center justify-center px-6 py-2 mt-10 mb-10">

      {/* Logo */}
      <Image
        className="mr-8 h-16 w-auto shrink-0"
        alt="Rapture Logo"
        height={120}
        src="/LOGO.png"
        width={120}
      />

      {/* Nav links */}
      <div className="flex flex-row flex-wrap">
        {item.map((item) => {
          const isActive = pathname === item.link;
          return (
            <a
              key={item.id}
              href={item.link}
              className={`w-55
                ${novaCut.className}
                px-5 text-xl tracking-widest
                flex items-center justify-center
                border border-white
                transition-colors duration-200
                ${isActive
                  ? "bg-white text-black"
                  : "bg-[#5d561e] text-white hover:bg-[#423d17]"
                }
              `}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
