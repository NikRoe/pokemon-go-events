import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "@/styles/themes/darkTheme";
import { GlobalStyles } from "@/styles/GlobalStyles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
