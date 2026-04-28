"use client";

import { useState } from "react";

type DropdownItem = {
  label: string;
  href: string;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
};

export default function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <ul className="p-2">
      <li>
        <a onClick={() => setOpen(!open)}>{label}</a>
        {open && (
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
}