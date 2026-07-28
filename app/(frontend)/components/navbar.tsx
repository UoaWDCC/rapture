"use client";

import { User } from "@/payload-types";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavbarPart from "./navbarPart";

import Dropdown from "./Dropdown";

type itemNav = {
  id: number;
  name: string;
  link: string;
  childrenLinks?: string[];
}

type NavProps = {
  item: itemNav[];
  user: User | null;
}

export default function Navbar({item}: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full fixed top-0 flex flex-row flex-wrap items-start justify-center px-6 py-2 mt-10 mb-10 bg-transparent z-1000">

      {/* Logo */}
      <Image
        className="mr-8 h-16 w-auto shrink-0"
        alt="Rapture Logo"
        height={120}
        src="/LOGO.png"
        width={120}
      />

      <div className="flex flex-row flex-wrap gap-1">
        {item.map((item) => {
          const isActive = pathname === item.link;
          return(
            <a 
              key={item.id}
              href={item.link}>
              <NavbarPart 
                id={item.id} 
                name={item.name} 
                childrenLinks={item.childrenLinks}
              />
            </a>
          )
        })}
      </div>

      <div className="self-start relative">
        <Dropdown label="something" items={["idk", "idk2"]} />
      </div>
    </nav>
  );
}
