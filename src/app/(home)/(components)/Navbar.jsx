"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { MobileNav } from ".";
import useClickAwayListener from "@/hooks/useClickAway";

export default function Navbar() {
  const [openSideNav, setOpenSideNav] = useState(false);

  const headerRef = useRef();
  const pathname = usePathname();
  useClickAwayListener(headerRef, () => setOpenSideNav(false));

  const closeSideNav = () => {
    console.log("hello");
    setOpenSideNav(false);
  };

  return (
    <header
      className="z-[100] w-full py-4 px-4 absolute text-white flex items-center"
      ref={headerRef}
    >
      <Link href="/">
        <p className="text-white z-10 text-2xl font-righteous">
          Swift<span className="text-primary">Rides</span>
        </p>
      </Link>
      <nav className="ml-[3rem] hidden lg:flex gap-10 font-inter font-[600]">
        <Link
          href={"/"}
          className={` ${pathname == "/" ? "border-primary border-b-2" : "border-0"} `}
          onClick={closeSideNav}
        >
          Home
        </Link>
        <Link href={"#"} onClick={closeSideNav}>
          Our Services
        </Link>
        <Link href={"#"} onClick={closeSideNav}>
          About Us
        </Link>
        <Link
          href={"/contact-us"}
          className={` ${pathname == "/contact-us" ? "border-primary border-b-2" : "border-0"} `}
          onClick={closeSideNav}
        >
          Contact Us
        </Link>
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
