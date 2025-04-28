import EventsGrid from "@/components/EventGrid";
import Header from "@/components/Header";
import { events } from "@/data";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokemon Go Events</title>
      </Head>
      <main>
        <Header />
        <EventsGrid events={events} />;
      </main>
    </>
  );
}
