"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidDashboard, BiSolidUserAccount } from "react-icons/bi";
import { BsSendExclamationFill, BsCarFrontFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

 const dashboardLinks = [
  { id: 1, title: "dashboard", link: "/dashboard", icon: <BiSolidDashboard /> },
  { id: 2, title: "trips", link: "/trips", icon: <BsCarFrontFill /> },
  { id: 3, title: "requests", link: "/request", icon: <BsSendExclamationFill /> },
  { id: 4, title: "profile", link: "/profile", icon: <BiSolidUserAccount /> },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-full pb-6">
      <ul className="mt-[6rem] text-white font-jost flex flex-col gap-8 relative w-full">
        {dashboardLinks.map((item) => {
          return (
            <li key={item.id} className="min-w-full flex rounded-md overflow-hidden">
              <Link
                href={item.link}
                className={`capitalize  border overflow-hidden shadow-2xl ${
                  pathname == item.link
                    ? "text-primary border-primary"
                    : "border-darkGrey text-textGrey"
                } rounded-md px-4 py-2 text-lg font-[600] min-w-full flex items-center gap-2 flex-1`}
              >
                <span className="text-xl">{item.icon}</span> {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="mt-auto border-2 flex items-center gap-2 justify-center font-inter font-[600] border-primary py-2 px-4 w-full text-primary rounded-md">
        Log Out
        <span className="text-lg ">
          <MdLogout />
        </span>
      </button>
    </div>
  );
}
