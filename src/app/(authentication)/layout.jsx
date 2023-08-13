import Image from "next/image";
import taxiPhoto from "../../../public/images/taxi-photo.webp";

export default function AuthenticationLayout({ children }) {
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url('/images/taxi-photo.webp')` }}
      >
        <p className="text-white w-full text-center text-[1.8rem] md:text-[2.5rem] relative font-righteous ">
          Welcome to SwiftRides
        </p>

        <div>{children}</div>
      </div>
    </>
  );
}
