"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setNextTheme(nextTheme === "light" ? "dark" : "light");
  };

  const setTheme = (theme: Theme) => {
    setNextTheme(theme);
  };

  // Ensure theme is "light" during SSR to match server render
  const theme = mounted
    ? ((nextTheme === "system" ? "light" : nextTheme) as Theme)
    : "light";

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  const value = {
    theme,
    toggleTheme,
    setTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
