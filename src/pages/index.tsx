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

  function handleFilterClick(filter: EventFilter) {
    if (filter === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  }
  return (
    <>
      <Head>
        <title>Pokemon Go Events</title>
      </Head>
      <main>
        <Header />
        <FilterBar
          activeFilter={activeFilter}
          onFilterClick={handleFilterClick}
        />
        <EventsGrid events={filteredEvents} />
      </main>
    </>
  );
}
