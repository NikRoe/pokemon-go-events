import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { CustomThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <GlobalStyles />
      <Header />
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </CustomThemeProvider>
  );
}
