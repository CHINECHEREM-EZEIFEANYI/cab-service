"use client";
import React from "react";
import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";

export default function TimePicker({ timeValue, onChange }) {
  const date = new Date();

  return (
    <>
      <Flatpickr
        data-enable-time
        value={date}
        onChange={([date]) => console.log(date)}
        options={{ dateFormat: "Y-m-d H:i K", enableTime: true }}
        className="bg-transparent outline-none font-[600]"
      ></Flatpickr>
    </>
  );
}
