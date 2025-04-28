import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { CustomThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}
