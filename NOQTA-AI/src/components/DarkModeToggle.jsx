import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition hover:scale-105 shadow-md"
    >
      {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-800" />}
    </button>
  );
}
