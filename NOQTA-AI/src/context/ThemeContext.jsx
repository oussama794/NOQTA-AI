import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
    theme: "light",
    isDark: false,
    toggleTheme: () => { },
    setTheme: () => { },
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
        if (stored === "dark" || stored === "light") return stored;
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    });

    const isDark = theme === "dark";

    useEffect(() => {
        if (typeof document !== "undefined") {
            const root = document.documentElement;
            if (isDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
        try {
            localStorage.setItem("theme", theme);
        } catch { }
    }, [theme, isDark]);

    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    const value = useMemo(() => ({ theme, isDark, toggleTheme, setTheme }), [theme, isDark]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}


