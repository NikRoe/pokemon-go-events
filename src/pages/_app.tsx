import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { CustomThemeProvider } from "@/context/ThemeContext";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <CustomThemeProvider>
      <GlobalStyles />
      <SWRConfig value={{ fetcher }}>
        <Layout showFooter={router.pathname !== "/"}>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </CustomThemeProvider>
  );
}
