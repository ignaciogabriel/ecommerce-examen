// app/src/context/ThemeContext.jsx

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {

    localStorage.setItem(
      "theme",
      theme
    );

    const html =
      document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

  }, [theme]);

  const toggleTheme = () => {

    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );

  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}