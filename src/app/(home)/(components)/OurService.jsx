import React from "react";

const benefitsData = [
  {
    id: 1,
    title: "Convenience",
    description:
      " Easily book a taxi at your preferred time and location without the hassle of searching for parking or waiting for public transportation",
  },
  {
    id: 2,
    title: "24/7 Availability",
    description:
      "Taxi services often operate around the clock, providing transportation options for early mornings, late nights, and any time in between",
  },
  {
    id: 3,
    title: "Time-Saving",
    description:
      "Taxis offer direct point-to-point transportation, minimizing travel time by taking the most efficient routes.",
  },
  {
    id: 4,
    title: "Professional Drivers",
    description:
      "Licensed and experienced drivers provide safe and reliable transportation, ensuring a comfortable and secure journey",
  },
  {
    id: 5,
    title: "Customer Support",
    description:
      "Taxi services often provide customer support to address any issues or concerns you may have during your journey.",
  },
  {
    id: 6,
    title: "No Parking Worries",
    description:
      "Avoid the challenges of finding parking in busy areas by using a taxi for your transportation needs",
  },
];

const FeatureCards = ({ title, description }) => {
  return (
    <div className="w-[90%] lg:w-[30%] md:w-[45%] shadow-benefits py-8 px-4 flex flex-col gap-4">
      <p className="text-center text-xl  font-inter font-[700]">{title}</p>
      <p className="text-darkGrey">{description}</p>
    </div>
  );
};

export default function OurService() {
  return (
    <div className="flex flex-col">
      <h2 className="text-center font-righteous text-[1.5rem] md:text-[2rem] w-fit my-4 border-b-2 border-primary relative left-[50%] -translate-x-[50%]">
        Benefits and Features
      </h2>
      <div className="flex flex-wrap px-4 gap-4 justify-center">
        {benefitsData.map((item) => {
          return <FeatureCards key={item.id} title={item.title} description={item.description} />;
        })}
      </div>
    </div>
  );
}
