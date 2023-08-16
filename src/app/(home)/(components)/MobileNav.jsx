"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Our Services", url: "/services" },
  { id: 3, name: "About Us", url: "/about-us" },
  { id: 4, name: "Contact Us", url: "/contact-us" },
];

const sideNav = {
  hidden: { x: "100vw" },
  show: {
    x: 0,
    transition: { type: "spring", duration: 1.8, bounce: 0.6, delayChildren: 2 },
  },
};

export default function MobileNav({ openSideNav, setOpenSideNav }) {
  return (
    <>
      <AnimatePresence>
        {openSideNav && (
          <motion.div
            className="absolute top-20 font-jost font-[600] right-0 lg:hidden w-[70vw] flex flex-col popover py-2"
            variants={sideNav}
            initial="hidden"
            animate="show"
            exit={{ x: "100vw" }}
          >
            <ul className="flex flex-col gap-4 justify-center items-center">
              {links.map((item) => {
                return (
                  <li key={item.id} className="text-lg">
                    <Link href={item.url} onClick={() => setOpenSideNav(false)}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto self-center flex w-full justify-evenly gap-2 font-[600]">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
