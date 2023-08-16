import Image from "next/image";
import React from "react";
import Car from "../../../../../public/svg/car.svg";

export default function page() {
  return (
    <div className="flex flex-col">
      <p className="flex justify-center font-jost text-[2rem] mt-6 font-600">
        Select type of car for the journey
      </p>
      <div>
        {Array.from({ length: 2 })}
        <div>
          <div className="rounded-full border">
            <Image src={Car} alt="" priority height={250} width={250} />
          </div>
        </div>
      </div>
    </div>
  );
}
