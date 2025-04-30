import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { CustomThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import { useState } from "react";
import { initialEvents } from "@/data/events";
import type { Event } from "@/types/event";

export default function App({ Component, pageProps }: AppProps) {
  const [events] = useState<Event[]>(initialEvents);

  return (
    <CustomThemeProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} events={events} />
    </CustomThemeProvider>
  );
}
