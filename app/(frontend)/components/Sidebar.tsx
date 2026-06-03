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

  // Close sidebar when navigating to a new page
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  // Close sidebar on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeSidebar();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSidebar]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Track screen size for responsive sidebar width
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);

    function handleChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  };

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: isDesktop ? "320px" : "100vw",
    background: "#0a0a0a",
    zIndex: 1050,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    display: "flex",
    flexDirection: "column",
    padding: "5rem 1.5rem 2rem",
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  };

  const linkBaseStyle: React.CSSProperties = {
    display: "block",
    padding: "0.75rem 1rem",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1.125rem",
    letterSpacing: "0.05em",
    borderRadius: "4px",
  };

  const linkActiveStyle: React.CSSProperties = {
    ...linkBaseStyle,
    background: "rgba(255, 255, 255, 0.15)",
    fontWeight: "bold",
  };

  return (
    <>
      <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Overlay backdrop — click to close */}
      {isOpen && (
        <div
          style={overlayStyle}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
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
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
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
