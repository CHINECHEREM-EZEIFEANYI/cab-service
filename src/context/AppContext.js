"use client";
import { useContext, createContext, useState } from "react";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [rideTextInView, setRideTextInView] = useState(true);
  const value = {
    rideTextInView,
    setRideTextInView,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (appContext == undefined) {
    throw new Error("Use Appcontext within a provider");
  }
  return appContext;
};
