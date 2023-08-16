"use client";
import React, { useState, useEffect } from "react";
import Faq from "react-faq-component";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
const data = {
  title: "Frequently Asked Questions",
  rows: [
    {
      title: "How do I book a taxi?",
      content: `Booking a taxi is easy! You can book through our website, mobile app, or by calling our hotline. Simply provide your pickup and drop-off locations, date, and time, and your ride will be confirmed`,
    },
    {
      title: "Are your drivers licensed and experienced?",
      content:
        "Yes, all our drivers are licensed professionals with extensive experience. They undergo background checks and regular training to ensure your safety and comfort",
    },
    {
      title: "What are the available payment methods?",
      content: `We offer various payment options including credit/debit cards, mobile wallets, and cash. You can choose your preferred method while booking or paying the driver directly`,
    },
    {
      title: "Can I request a specific type of vehicle?",
      content: `Absolutely! We offer a variety of vehicles to cater to your needs. Whether you need a small bus, big bus, or a pickup, you can specify your preference during the booking process`,
    },
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: "#facc15",
  rowTitleColor: "#0a0a0a",
  rowContentColor: "#a3a3a3",
  // arrowColor: "red",
};

const config = {
  animate: true,
  arrowIcon: "V",
  openOnload: 0,
  expandIcon: <BsPlusLg />,
  collapseIcon: <BiMinus />,
};

export default function FAQS() {
  return (
    <div className="w-[80%] mx-auto mt-8">
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
}
