import { motion } from "framer-motion";
import Link from "next/link";

const pathVariants = {
  initial: { opacity: 0, pathLength: 0 },
  final: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};
export default function Success() {
  return (
    <>
      <div className="relative flex flex-col items-center font-inter gap-4">
        <div className="w-[12rem] height-[12rem] mt-8 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#facc15"
              strokeWidth="5"
              fill="white"
              variants={pathVariants}
              initial="initial"
              animate="final"
            />
            <motion.path
              d="M25 50 L45 70 L75 35"
              stroke="#facc15"
              strokeWidth="5"
              fill="none"
              variants={pathVariants}
              initial="initial"
              animate="final"
            />
          </svg>
        </div>
        <p className="font-[600] text-center">Taxi Booked and awaiting Confirmation</p>
        <Link href="#" className="bg-primary text-white rounded-md py-2 px-4 font-[700]">
          Dashboard
        </Link>
      </div>
    </>
  );
}
