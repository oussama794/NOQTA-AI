import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto mb-3 flex items-center gap-2 rounded-full border px-3 py-1 text-sm shadow-sm transition hover:scale-105 bg-white border-zenith text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
