import { createContext, useContext, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "@/styles/themes/darkTheme";
import { lightTheme } from "@/styles/themes/lightTheme";
import useLocalStorageState from "use-local-storage-state";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function CustomThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorageState<ThemeMode>("theme", {
    defaultValue: "dark",
  });

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const themeObject = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
