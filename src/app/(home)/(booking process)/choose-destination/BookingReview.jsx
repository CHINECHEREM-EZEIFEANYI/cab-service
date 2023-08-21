import React from "react";
import { addSeconds, intervalToDuration } from "date-fns";
import { FaCar } from "react-icons/fa";
import { GiMoneyStack, GiTimeBomb } from "react-icons/gi";
import { MdCalendarMonth } from "react-icons/md";
import { TimePicker } from "@/components/ui";

export default function BookingReview({ journeyData, setSteps }) {
  if (journeyData.duration == 0) {
    return (
      <div className="absolute top-10 left-4 z-[1] bg-white h-[5rem] py-4 px-2 rounded-md">
        <p className="font-inter">
          Click on a location on the map <br /> to choose destination
        </p>
      </div>
    );
  }

  const currentDate = new Date();
  const arrivalDate = addSeconds(currentDate, journeyData.duration);
  const duration = intervalToDuration({
    start: currentDate,
    end: arrivalDate,
  });

  const { years, months, days, hours, minutes } = duration;
  const distance = Math.round(journeyData.distance / 1000);
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(distance * 22);

  return (
    <div className="absolute top-10 left-4 z-[1] bg-white py-4 px-2 rounded-md font-jost">
      <h2 className="text-center font-righteous text-primary text-xl">Journey Details</h2>
      <p className="flex items-center gap-2">
        <span className="font-[600] text-primary text-xl">
          <GiTimeBomb />
        </span>
        {years > 0 ? (
          <p className="">
            <span className="font-[600]">Years</span>: {years}{" "}
            <span className="font-[600]">Months</span>: {months}{" "}
            <span className="font-[600]">Days</span>: {days}{" "}
            <span className="font-[600]">Hours</span>: {hours}{" "}
            <span className="font-[600]">Minutes</span>: {minutes}
          </p>
        ) : months > 0 ? (
          <p className="">
            <span className="font-[600]">Months</span>: {months}{" "}
            <span className="font-[600]">Days</span>: {days}{" "}
            <span className="font-[600]">Hours</span>: {hours}{" "}
            <span className="font-[600]">Minutes</span>: {minutes}
          </p>
        ) : days > 0 ? (
          <p className="">
            <span className="font-[600]">Days</span>: {days}{" "}
            <span className="font-[600]">Hours</span>: {hours}{" "}
            <span className="font-[600]">Minutes</span>: {minutes}
          </p>
        ) : hours > 0 ? (
          <p className="">
            <span className="font-[600]">Hours</span>: {hours}{" "}
            <span className="font-[600]">Minutes</span>: {minutes}
          </p>
        ) : (
          <p className="">
            <span className="font-[600]">Minutes</span>: {minutes}
          </p>
        )}
      </p>
      <div className="flex items-center gap-4">
        <p className="flex items-center gap-2 text-lg font-[600]">
          <span className="text-primary text-xl">
            <FaCar />
          </span>
          {distance}Km
        </p>
        <p className="flex items-center gap-2 font-[600]">
          <span>
            <GiMoneyStack className="text-xl text-primary" />
          </span>
          {formattedAmount}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-primary text-lg font-[600]">
          <MdCalendarMonth />
        </span>
        <TimePicker />
      </div>

      <button
        className="h-[2.5rem] w-full bg-primary text-white font-[600] px-4 flex items-center justify-center rounded-md mt-2"
        onClick={() => setSteps(3)}
      >
        Book Ride
      </button>
    </div>
  );
}
