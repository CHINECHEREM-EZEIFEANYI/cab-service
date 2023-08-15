"use client";
import React from "react";
import { motion } from "framer-motion";
export default function Banner() {
  const bannerBounce = {
    hidden: { x: "-100vw" },
    show: {
      x: 0,
      transition: { type: "spring", duration: 2, bounce: 0.6, delayChildren: 2 },
    },
  };

  const buttonAnimation = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.8, type: "spring", bounce: 0.7 },
    },
  };
  return (
    <div className=" h-[40rem] relative">
      <div
        className="bg-cover bg-center h-full w-full"
        style={{ backgroundImage: `url('/images/banner-img.webp')` }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        ></div>
        <motion.div
          className="absolute bottom-14 lg:bottom-4 text-white pl-6"
          variants={bannerBounce}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-[3rem] lg:text-[5rem] font-jost font-[600]">
            <span className="text-primary"> Book A Ride </span> <br /> Embrace the Adventure
          </h1>
          <motion.button
            className="relative top-[45%] bg-primary text-white text-[2rem] lg:text-[2.5rem] font-[600] rounded-lg px-6 py-2 md:px-10 md:py-4 shadow-2xl"
            variants={buttonAnimation}
            whileHover="hover"
          >
            Get A Ride
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
