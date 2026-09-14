"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";

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
};

export default function MobileNavbar({ item }: NavProps) {
  const [openItemIds, setOpenItemIds] = useState<Record<number, boolean>>({});

  const toggleItem = (id: number) => {
    setOpenItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mx-auto w-full max-w-[420px] bg-[#04080e] px-3 pb-2 pt-2 shadow-[0_0_0_1px_rgba(58,118,255,0.35)]">
      <div className="flex items-center justify-between gap-3 pb-3">
        <Link href="/login">
          <Image
            className="pt-3 pl-4 hover:filter-grey"
            alt="Account Profile"
            height={60}
            width={60}
            src="/Account.svg"
          />
        </Link>

        <Image
          className="ml-4 h-14 w-auto shrink-0"
          alt="Rapture Logo"
          height={100}
          width={100}
          src="/LOGO.png"
        />

        <div className="flex h-16 w-16 items-center justify-center">
          <Sidebar />
        </div>
      </div>

      <div className="space-y-2">
        {item.map((navItem) => {
          const isOpen = !!openItemIds[navItem.id];
          const hasChildren = navItem.childrenLinks.length > 0;

          return (
            <div key={navItem.id} className="space-y-1">
              <button
                type="button"
                onClick={() => hasChildren && toggleItem(navItem.id)}
                className="flex h-14 w-full items-center justify-center border border-[#2d8cff] bg-[#0f3c87] text-center text-[1.9rem] font-light text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-opacity duration-200 hover:opacity-90 [clip-path:polygon(0_0,99%_0,100%_30%,100%_100%,0_100%)]"
                style={{
                  clipPath: "polygon(0 0, 97% 0, 100% 30%, 100% 100%, 0 100%)",
                }}
              >
                <span
                  className={`mr-4 inline-block h-0 w-0 border-y-[10px] border-r-[18px] border-y-transparent transition-transform duration-300 ${
                    isOpen ? "rotate-270 border-r-white" : "border-r-white"
                  }`}
                />
                <span className="flex-1 text-center">{navItem.name}</span>
              </button>

              {hasChildren && (
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-1 pt-1">
                      {navItem.childrenLinks.map((child) => (
                        <Link
                          key={child.id}
                          href={child.link}
                          className="flex h-12 items-center justify-center border border-[#2d8cff] bg-[#0f3c87] text-center text-[1.7rem] font-light text-white transition-opacity duration-200 hover:opacity-90 [clip-path:polygon(0_0,99%_0,100%_30%,100%_100%,0_100%)]"
                          style={{
                            clipPath: "polygon(0 0, 97% 0, 100% 30%, 100% 100%, 0 100%)",
                          }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}