"use client";
import useDeviceLocation from "@/hooks/useDeviceLocation";
import Map from "./Map";
import { Loader } from "@/components/ui";
import Success from "./Success";
import { useEffect, useState } from "react";

export default function page() {
  const { coordinates, error } = useDeviceLocation();
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    if (coordinates != null) {
      setSteps(2);
    }
  }, [coordinates]);

  return (
    <section className="relative">
      {steps == 1 ? (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : steps == 2 ? (
        <Map initialCoordinates={coordinates} setSteps={setSteps} />
      ) : (
        <Success />
      )}
    </section>
  );
}
