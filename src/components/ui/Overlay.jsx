export default function Overlay({ children }) {
  return <div className="fixed z-[1000] top-0 bottom-0 left-0 right-0 popover">{children}</div>;
}
