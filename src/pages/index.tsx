import EventsGrid from "@/components/EventsGrid";
import FilterBar from "@/components/FilterBar";
import { Event } from "@/types/event";
import { EventFilter } from "@/types/filter";
import { filterEvents } from "@/utils/filterEvents";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";

interface HomeProps {
  events: Event[];
}

export default function Home({ events }: HomeProps) {
  const [activeFilter, setActiveFilter] = useLocalStorageState<EventFilter>(
    "activeFilter",
    {
      defaultValue: "active",
    }
  );

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
        <FilterBar
          activeFilter={activeFilter}
          onFilterClick={handleFilterClick}
        />
        <EventsGrid events={filteredEvents} />
      </main>
    </>
  );
}
