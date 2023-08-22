"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiSolidDashboard, BiSolidUserAccount } from "react-icons/bi";
import { BsSendExclamationFill, BsCarFrontFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const dashboardLinks = [
  { id: 1, title: "dashboard", link: "/dashboard", icon: <BiSolidDashboard /> },
  { id: 2, title: "trips", link: "/trips", icon: <BsCarFrontFill /> },
  { id: 3, title: "requests", link: "/request", icon: <BsSendExclamationFill /> },
  { id: 4, title: "profile", link: "/profile", icon: <BiSolidUserAccount /> },
];
export default function DashMobile() {
  const pathname = usePathname();
  return (
    <div className="fixed md:hidden bottom-0 right-0 left-0 z-[1000] py-2 bg-[#141919] h-[3.5rem]">
      <ul className="flex items-center justify-around">
        {dashboardLinks.map((item) => {
          return (
            <li
              key={item.id}
              className={`flex flex-col items-center ${
                pathname == item.link ? "text-primary" : "text-textGrey"
              } `}
            >
              <span className="text-xl">{item.icon}</span>
              <Link href={item.link} className="capitalize font-[600] font-jost">
                {" "}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
