import { Footer, Navbar } from "./(components)";
export default function layout({ children }) {
  return (
    <div>
      <Navbar />

      {children}
      <Footer />
    </div>
  );
}
