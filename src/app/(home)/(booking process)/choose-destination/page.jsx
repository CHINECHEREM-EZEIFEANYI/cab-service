"use client";
import useDeviceLocation from "@/hooks/useDeviceLocation";
import Map from "./Map";
import { Loader } from "@/components/ui";
import Success from "./Success";
import { useEffect, useState } from "react";

export default function page() {
  const { coordinates, error } = useDeviceLocation();
  const [steps, setSteps] = useState(3);

  useEffect(() => {
    if (coordinates != null) {
      setSteps(1);
    }
  }, [coordinates]);

  return (
    <section className="relative">
      {steps == 1 ? (
        <Map initialCoordinates={coordinates} setSteps={setSteps} />
      ) : steps == 2 ? (
        <Success />
      ) : (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </section>
  );
}
