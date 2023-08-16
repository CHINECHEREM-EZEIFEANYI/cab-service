"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { MobileNav } from ".";
import useClickAwayListener from "@/hooks/useClickAway";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const navLinks = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Our Services", url: "/services" },
  { id: 3, title: "About Us", url: "/about-us" },
  { id: 4, title: "Contact Us", url: "/contact-us" },
];

export default function Navbar() {
  const [openSideNav, setOpenSideNav] = useState(false);
  const { rideTextInView } = useAppContext();
  const headerRef = useRef();
  const pathname = usePathname();
  useClickAwayListener(headerRef, () => setOpenSideNav(false));
  return (
    <header
      className={`z-[100] w-full py-4 px-4 fixed top-0 text-white flex items-center ${
        rideTextInView && pathname == "/"
          ? " bg-transparent"
          : !rideTextInView && pathname == "/"
          ? "bg-[#141919]"
          : "bg-[#141919]"
      }`}
      ref={headerRef}
    >
      <Link href="/">
        <p className="text-white z-10 text-2xl font-righteous">
          Swift<span className="text-primary">Rides</span>
        </p>
      </Link>
      <nav className="ml-[3rem] hidden lg:flex gap-10 font-inter font-[600]">
        {navLinks.map((item) => {
          return (
            <Link key={item.id} href={item.url} className={`relative`}>
              {item.title}
              {pathname == item.url && (
                <motion.span
                  layoutId="underline"
                  className="absolute border-b border-primary w-full  left-0 top-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="hidden lg:flex ml-auto gap-4 font-[600]">
        <Link href={"/login"}>
          <button
            type="button"
            className="bg-primary py-2 px-4 rounded-sm border border-primary text-white"
          >
            Login
          </button>
        </Link>
        <Link href={"/sign-up"}>
          <button type="button" className=" py-2 px-4 rounded-sm border border-primary">
            Register
          </button>
        </Link>
      </div>

      <button
        type="button"
        className="text-white ml-auto text-[2rem] border border-primary p-1 lg:hidden rounded-lg"
        onClick={() => setOpenSideNav((prev) => !prev)}
      >
        <BiMenu />
      </button>
      <MobileNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />
    </header>
  );
}

// bg-[#141919]
