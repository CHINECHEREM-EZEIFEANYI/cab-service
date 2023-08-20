import React from "react";
import formatDuration from "date-fns/formatDuration";

export default function BookingReview({ journeyData }) {
  // const duration = formatDuration(journeyData?.duration);
  // console.log(duration);
  return (
    <div className="absolute bottom-0 z-[100] bg-white">
      <p>{journeyData?.duration}</p>
      <p>{journeyData?.distance}</p>
      <p>Amount</p>
    </div>
  );
}
