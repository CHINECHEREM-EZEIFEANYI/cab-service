import React from "react";
import Link from "next/link";
import SideNav from "./SideNav";
import DashMobile from "./DashMobile";

export default function layout({ children }) {
  return (
    <>
      <main className="min-h-screen relative">
        <header className="z-[100] w-full bg-[#141919] py-4 px-4 fixed top-0 text-white flex items-center">
          <Link href="/">
            <p className="text-white z-10 text-2xl font-righteous">
              Swift<span className="text-primary">Rides</span>
            </p>
          </Link>
          <button className="ml-auto border md:hidden border-primary text-primary py-1 px-2 rounded-md font-[600] font-jost">
            Logout
          </button>
        </header>

        <section className="w-full flex ">
          <DashMobile />
          <aside className="min-w-[15%] hidden md:block min-h-screen px-4 bg-[#141919]">
            <SideNav />
          </aside>
          <section className="min-w-[70%] flex-1 pt-[4rem]">{children}</section>
        </section>
      </main>
    </>
  );
}
