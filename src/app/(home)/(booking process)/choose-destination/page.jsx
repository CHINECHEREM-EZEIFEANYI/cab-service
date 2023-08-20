"use client";
import useDeviceLocation from "@/hooks/useDeviceLocation";
import Map from "./Map";
import { Loader } from "@/components/ui";

export default function page() {
  const { coordinates, error } = useDeviceLocation();

  if (coordinates == null) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return <Map initialCoordinates={coordinates} />;
}
