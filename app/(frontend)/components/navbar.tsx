"use client";

//import { NavbarItems } from "../someplace";
import { User } from "@/payload-types";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Nova_Cut } from "next/font/google";

const novaCut = Nova_Cut({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nova-cut",
});

type itemNav = {
  id:number;
  name:string;
  link:string;
}

type NavProps = {
  item:itemNav[];
  user:User | null;
}

export default function Navbar({item}: NavProps) {
  const pathname = usePathname();

  return (
    <nav lang="en" className={`${novaCut.variable} text-white w-auto mt-14 flex flex-row flex-wrap items-center justify-center md:flex-row`}>
      {/* maybe put a logo first. depends on design */}

      <Image
        className="mr-10 h-18 w-30"
        alt="Payload Logo"
        height={120}
        src="/LOGO.png"
        width={120}
      />

      <div className="flex flex-row flex-wrap justify-center overflow-hidden">        
        {item.map((item) => {
          const isActive = pathname === item.link;

          return(
            <a
              className={`w-50 h-9 px-6 py-0.5
                ${novaCut.className}
                flex items-center justify-center
                text-2xl
                border-2 border-white
                transition-colors duration-200
                ${isActive 
                  ? "bg-white text-black" 
                  : "bg-[#2C2A1A]/80 text-white hover:bg-[#3d3a22]"
                }
              `}
              key={item.id}
              href={item.link}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
