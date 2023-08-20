"use client";
import useDeviceLocation from "@/hooks/useDeviceLocation";
import Map from "./Map";
import { Loader } from "@/components/ui";
import { useEffect, useState } from "react";
import { BsNutFill } from "react-icons/bs";

export default function page() {
  const { coordinates, error } = useDeviceLocation();

  useEffect(() => {
    if (coordinates != null) {
      setSteps(2);
    }
  }, [coordinates]);

  const [steps, setSteps] = useState(1);

  return (
    <section className="relative">
      {steps == 1 ? (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : steps == 2 ? (
        <Map initialCoordinates={coordinates} />
      ) : (
        <div>Success</div>
      )}
    </section>
  );
}
