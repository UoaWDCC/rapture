"use client";

import { User } from "@/payload-types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavbarPart from "./navbarPart";
import MobileNavbar from "./MobileNavbar";

import Dropdown from "./Dropdown";

type navLink = {
  id: number;
  name: string;
  link: string;
};

type itemNav = {
  id: number;
  name: string;
  link: string;
  childrenLinks: navLink[];
};

type NavProps = {
  item: itemNav[];
  user: User | null;
};

export default function Navbar({ item }: NavProps) {
  const pathname = usePathname();
  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopNavContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const nav = desktopNavRef.current;
    const container = desktopNavContainerRef.current;
    if (!nav || !container) return;

    const updateOverflow = () => {
      const navStyles = getComputedStyle(nav);
      const availableWidth =
        container.clientWidth -
        parseFloat(navStyles.paddingLeft) -
        parseFloat(navStyles.paddingRight);
      const requiredWidth = Array.from(nav.children).reduce((total, child) => {
        const childStyles = getComputedStyle(child);
        return (
          total +
          (child as HTMLElement).getBoundingClientRect().width +
          parseFloat(childStyles.marginLeft) +
          parseFloat(childStyles.marginRight)
        );
      }, 0);

      setIsOverflowing(requiredWidth > availableWidth);
    };

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(container);
    observer.observe(nav);
    Array.from(nav.children).forEach((child) => observer.observe(child));
    updateOverflow();

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={desktopNavContainerRef}
        className={`relative z-9999 hidden w-full md:block ${
          isOverflowing ? "h-0" : "mt-10 mb-10"
        }`}
      >
        <nav
          ref={desktopNavRef}
          className={`relative top-0 flex w-full flex-row flex-nowrap items-start justify-center bg-transparent px-6 py-2 ${
            isOverflowing ? "absolute left-0 invisible" : ""
          }`}
        >
          {/* Logo */}
          <Image
            className="mr-8 h-14 w-auto shrink-0"
            alt="Rapture Logo"
            height={120}
            width={120}
            src="/LOGO.png"
          />

          <Link
            href="/"
            className="mr-1 mt-4 flex h-8 w-[clamp(8rem,16vw,12.5rem)] shrink-0 items-center border border-blue-500 bg-blue-800 pl-3 text-xl opacity-100 [clip-path:polygon(0_0,90%_0,93%_30%,100%_30%,100%_100%,0_100%)] hover:opacity-80"
          >
            Home
          </Link>

          <div className="mt-4 flex shrink-0 flex-row flex-nowrap gap-1">
            {item.map((item) => {
              const isActive = pathname === item.link;
              return (
                <NavbarPart
                  key={item.id}
                  label={item.name}
                  items={item.childrenLinks}
                />
              );
            })}
          </div>

          {/* Account Profile */}
          <Link href="/login" className="shrink-0">
            <Image
              className="pt-3 pl-4 hover:filter-grey"
              alt="Account Profile"
              height={60}
              width={60}
              src="/Account.svg"
            />
          </Link>
        </nav>
      </div>

      <div className={isOverflowing ? "block" : "md:hidden"}>
        <MobileNavbar item={item} />
      </div>
    </>
  );
}
