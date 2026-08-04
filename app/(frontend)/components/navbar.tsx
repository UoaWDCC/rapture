"use client";

import { User } from "@/payload-types";
import { usePathname } from "next/navigation";
import Link from "next/link"
import Image from "next/image";
import NavbarPart from "./navbarPart";

import Dropdown from "./Dropdown";

type navLink = {
  id: number;
  name: string;
  link: string;
}

type itemNav = {
  id: number;
  name: string;
  link: string;
  childrenLinks: navLink[];
}

type NavProps = {
  item: itemNav[];
  user: User | null;
}

export default function Navbar({item}: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full top-0 flex flex-row flex-wrap items-start justify-center px-6 py-2 mt-10 mb-10 bg-transparent">

      {/* Logo */}
      <Image
        className="mr-8 h-16 w-auto shrink-0"
        alt="Rapture Logo"
        height={120}
        src="/LOGO.png"
        width={120}
      />

      <Link href="/" className="w-50 h-8 mr-1 bg-blue-800 border border-blue-500 opacity-70 text-xl flex items-center pl-2 pt-0.5 [clip-path:polygon(0_0,90%_0,93%_30%,100%_30%,100%_100%,0_100%)] hover:opacity-90">
        Home
      </Link>

      <div className="flex flex-row flex-wrap gap-1">
        {item.map((item) => {
          const isActive = pathname === item.link;
          return(
              <NavbarPart 
                key={item.id}
                label={item.name} 
                items={item.childrenLinks}
              />
          )
        })}
      </div>
    </nav>
  );
}
