import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import { useEffect, useRef } from "react";

export default function Duedate({ value = "", onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const picker = new Pikaday({
      field: inputRef.current,
      format: "YYYY-MM-DD", // ✅ this makes input show YYYY-MM-DD
      onSelect(date) {
        const formatted = picker.toString(); // ✅ returns YYYY-MM-DD
        onChange?.(formatted);
      },
    });

    return () => picker.destroy();
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Add Due Date"
      className="w-full p-2.5 rounded-lg bg-[#1C1F26] text-white outline-none focus:ring-2 focus:ring-blue-600 flex items-center"
    />
  );
}
