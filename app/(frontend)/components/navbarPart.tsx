"use client";

import { useState, useRef, useEffect } from "react";

type DropdownItem = {
  label: string;
};

type navLink = {
    id: number;
  name: string;
  link: string;
}

type DropdownProps = {
  key: number;
  label: string;
  items: navLink[];
};

export default function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div className="w-50 h-8 bg-blue-800 border border-blue-500 text-xl flex items-center pl-2 pt-0.5 [clip-path:polygon(0_0,90%_0,93%_30%,100%_30%,100%_100%,0_100%)] hover:opacity-80">
        <button className="w-full h-full flex items-center" onClick={() => setOpen(!open)}>▶ {label}</button>
      </div>

      <ul className={`w-full transition-all duration-300 overflow-hidden absolute ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        {items.map((item) => (
          <li key={item.id} className="p-1 pl-8 text-xl bg-blue-800 hover:opacity-80 border-t-2 border-b-2 border-black">
            <a href={item.link}>
                <button onClick={() => {
                    setSelected(item.name);
                    setOpen(false);
                    }}>
                    {item.name}
                </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}    