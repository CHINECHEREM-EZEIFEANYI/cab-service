import "./globals.css";
import { Inter, Jost, Righteous, Permanent_Marker } from "next/font/google";
import AppContextProvider from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});
const permanent_marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent_marker",
});

export const metadata = {
  title: "Swift Rides",
  description: "Taxi booking web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${righteous.variable} ${jost.variable} ${permanent_marker.variable}`}
      >
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
