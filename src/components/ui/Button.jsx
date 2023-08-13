export default function Button({ children, onClick, disabled, type, bgWhite }) {
  return (
    <button
      className={` disabled:bg-darkGrey disabled:border-darkGrey disabled:text-[#f5f5f5] hover:bg-white hover:text-black transition-all duration-200 ${
        bgWhite ? "bg-white text-black" : "bg-primary text-white"
      } w-full flex items-center h-full justify-center rounded-md border border-white font-[600]`}
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
