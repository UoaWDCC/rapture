"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HamburgerButton from "@/app/(frontend)/components/ui/HamburgerButton";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "News", href: "/news" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Donor", href: "/donor" },
  { name: "About Us", href: "/about" },
  { name: "Account", href: "/account" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeSidebar();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSidebar]);

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "#000000",
    zIndex: 1100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "2rem 1.25rem 2rem",
    overflow: "hidden",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    pointerEvents: isOpen ? "auto" : "none",
    transition: "transform 0.35s ease, opacity 0.25s ease",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
    marginTop: "4.5rem",
  };

  const linkBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "56px",
    padding: "0 1rem",
    color: "#f3f8ff",
    textDecoration: "none",
    fontSize: "2.1rem",
    letterSpacing: "0.04em",
    background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.14)",
    clipPath: "polygon(0 0, 94% 0, 100% 24%, 100% 100%, 0 100%)",
    transition: "opacity 0.2s ease, background 0.2s ease",
  };

  const linkActiveStyle: React.CSSProperties = {
    ...linkBaseStyle,
    background: "#1d1d1d",
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: "54px",
          height: "54px",
        }}
      >
        <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      </div>

      <aside
        style={panelStyle}
        role="navigation"
        aria-label="Side navigation"
      >
        <nav style={navStyle}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={isActive ? linkActiveStyle : linkBaseStyle}
                onClick={closeSidebar}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
