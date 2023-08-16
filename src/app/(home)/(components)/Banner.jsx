"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();
  const { setRideTextInView } = useAppContext();
  const bookRideText = useRef(null);
  const isInView = useInView(bookRideText, { margin: "-150px 0px 0px 0px" });
  useEffect(() => {
    setRideTextInView(isInView);
  }, [isInView, setRideTextInView]);
  const bannerBounce = {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut", delayChildren: 2 },
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
            <span ref={bookRideText} className="text-primary">
              {" "}
              Book A Ride{" "}
            </span>{" "}
            <br /> Embrace the Adventure
          </h1>
          <motion.button
            className="relative top-[45%] bg-primary text-white text-[2rem] lg:text-[2.5rem] font-[600] rounded-lg px-6 py-2 md:px-10 md:py-4 shadow-2xl"
            variants={buttonAnimation}
            whileHover="hover"
            onClick={() => router.push("/select-cab")}
          >
            Get A Ride
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
