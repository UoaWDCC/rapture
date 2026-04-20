"use client";

//import { NavbarItems } from "../someplace";
import { User } from "@/payload-types";
import { usePathname } from "next/navigation";

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
      <div className="content-center absolute right-5 top-5">
        {/* for the user part */}
        {user &&
          <a href="to login">Login</a>
        }
        {!user &&
          <ul>
            <li><a href="to profile page">Profile</a></li> {/* profile page link not added */}
            <li><a href="to profile page">Dashboard</a></li>
            {/* <li><button onClick={logout}>Logout</button></li>
            logout system not added (?) */}
          </ul>
        }
      </div>
    </nav>
  );
}
