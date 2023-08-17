"use client";
import React, { useState } from "react";
import Image from "next/image";
import Car from "../../../../../public/svg/car.svg";
import Bus from "../../../../../public/svg/bus.svg";
import { MdCheckCircle } from "react-icons/md";

const carsData = [
  { id: 1, name: "Small Taxi", image: Car },
  { id: 2, name: "Big Taxi", image: Bus },
];

export default function page() {
  const [selectedOption, setSelectedOption] = useState(1);
  return (
    <div className="flex flex-col">
      <p className="flex justify-center font-jost text-[1.5rem] mt-6 font-[600]">Select Taxi</p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
        {carsData.map((item) => {
          return (
            <div
              key={item.id}
              className={` ${
                selectedOption == item.id ? "shadow-select_car" : "shadow-select_car_white"
              } p-4 rounded-md relative cursor-pointer w-[12rem] h[14rem]`}
              onClick={() => setSelectedOption(item.id)}
            >
              <div className="rounded-full h-[10rem] w-[10rem] flex items-center justify-center">
                <Image src={item.image} alt="" priority height={200} width={200} />
              </div>
              <p className="text-center font-inter font-[600]">{item.name}</p>
              {selectedOption == item.id && (
                <div className="text-primary absolute right-2 bottom-4  text-[1.5rem]">
                  <MdCheckCircle />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="text-lg text-white bg-primary w-fit self-center my-6 rounded-md px-6 py-2 font-[600] font-inter">
        Next
      </button>
    </div>
  );
}
