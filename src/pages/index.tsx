import EventsGrid from "@/components/EventGrid";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";
import { events } from "@/data";
import { EventFilter } from "@/types/filter";
import { filterEvents } from "@/utils/filterEvents";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>(null);

  const filteredEvents = filterEvents(events, activeFilter);
  return (
    <>
      <Head>
        <title>Pokemon Go Events</title>
      </Head>
      <main>
        <Header />
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <EventsGrid events={filteredEvents} />;
      </main>
    </>
  );
}
