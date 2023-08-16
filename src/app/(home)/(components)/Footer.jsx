import React from "react";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { FaPhone, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const footerLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Our Services", url: "/services" },
  { id: 3, name: "About", url: "/about-us" },
  { id: 4, name: "Contact", url: "/contact-us" },
];

export default function Footer() {
  return (
    <div className="bg-footer flex flex-col md:flex-row gap-y-2 text-white font-inter relative px-4 py-6 lg:px-[12rem] lg:py-[4rem]">
      <div className="flex flex-col md:w-1/2 lg:w-1/4 gap-6">
        <Link href="/">
          <p className="text-white z-10 text-2xl font-righteous">
            Swift<span className="text-primary">Rides</span>
          </p>
        </Link>
        <p className="text-xs text-darkGrey leading-6">
          Our taxi service web application is designed to provide convenient and reliable
          transportation solutions. Thank you for choosing our taxi service to meet your travel
          needs.
        </p>
      </div>

      <div className="md:w-1/2 lg:w-1/4 flex flex-col gap-6 md:items-center">
        <p className="font-[600]">Useful Links</p>
        <ul className="flex flex-col gap-3 text-xs">
          {footerLinks.map((item) => (
            <li key={item.id}>
              <Link href={item.url} className="hover:underline text-darkGrey">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:w-1/2 lg:w-1/4 flex flex-col gap-6 md:items-center">
        <p className="font-[600]">Contact Info</p>
        <ul className="flex flex-col gap-3 text-darkGrey text-xs">
          <li className="flex items-center gap-2">
            <span className="text-primary">
              <IoMdMail />
            </span>
            swiftrides@info.com
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">
              <FaPhone />
            </span>
            07034567564
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">
              <MdLocationOn />
            </span>
            UNN
          </li>
        </ul>
      </div>

      <div className="md:w-1/2 lg:w-1/4 flex flex-col gap-6 md:items-center mb-6">
        <p className="font-[600]">Follow US</p>
        <div className="flex flex-col gap-2 text-darkGrey text-xs">
          <ul className="text-darkGrey flex text-lg gap-4">
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaInstagram />
            </li>
          </ul>
        </div>
      </div>
      <p className="absolute w-full bottom-0 text-center text-xs left-[50%] translate-x-[-50%] text-darkGrey my-2">
        &copy; 2023 SwiftRides. All rights reserved.
      </p>
    </div>
  );
}
