"use client";

//import { NavbarItems } from "../someplace";
import { User } from "@/payload-types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Dropdown from "./Dropdown.tsx";

type itemNav = {
  id:number;
  name:string;
  link:string;
}

type NavProps = {
  item:itemNav[];
  user:User | null;
}

export default function Navbar({item, user}: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white font-serif text-l w-screen h-15 content-center absolute top-10 left-0">
      {/* maybe put a logo first. depends on design */}
      <div className="content-center w-[90%]">        
        {item.map((item) => {
          const isActive = pathname === item.link;

          return(
            <a
              className={`p-5 ${isActive ? "text-blue-950 font-bold" : ""}`}
              key={item.id}
              href={item.link}
            >
              {item.name}
            </a>
          );
        })}
      </div>

      {/* for the user part */}
      <div className="content-center absolute right-5 top-5 max-w-[10%] bg-amber-50 text-red-500">
        {!user && (
          <Dropdown
            label="Dropdown!"
            items={[
              { label: "Login", href: "/login" },
            ]}
          />
        )}

        {user && (
          <Dropdown
            label="Dropdown!"
            items={[
              { label: "Profile", href: "/profile" },
              { label: "Dashboard", href: "/dashboard" },
            ]}
          />
        )}
      </div>
    </nav>
  );
}
