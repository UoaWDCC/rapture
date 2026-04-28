"use client";

import { useState, useRef, useEffect } from "react";

type DropdownItem = {
  label: string;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
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
    <div ref={dropdownRef} className="p-2">
      <ul className="p-2">
        <li>
          <button onClick={() => setOpen(!open)}>{selected}</button>
          <ul className={`transition-all duration-300 overflow-hidden ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            {items.map((item) => (
              <li key={item.label} className="p-2 hover:bg-gray-950">
                <button onClick={() => {
                  setSelected(item.label);
                  setOpen(false);
                }}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}       