import React from "react";
import Link from "next/link";

import { Overlay } from "@/components/ui";

const links = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Our Services", url: "/services" },
  { id: 3, name: "About Us", url: "/about-us" },
  { id: 4, name: "Contact Us", url: "/contact-us" },
];

export default function MobileNav() {
  return (
    <div className="absolute top-16 right-0 lg:hidden ">
      <ul>
        {links.map((item) => {
          return (
            <li key={item.id} className="text-lg">
              <Link href={item.url}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
