export default function ColorDot({ color }) {
  // maps simple color keywords to Tailwind bg classes
  const map = {
    black: "bg-black",
    white: "bg-white border",
    brown: "bg-amber-700",
    yellow: "bg-yellow-300",
    blue: "bg-blue-400",
    gray: "bg-gray-300",
    lilac: "bg-violet-300",
  };
  const cls = map[color] || "bg-gray-400";
  return (
    <span className={`w-3 h-3 rounded-full ${cls} inline-block mr-1`}></span>
  );
}
