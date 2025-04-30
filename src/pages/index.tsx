import EventsGrid from "@/components/EventsGrid";
import FilterBar from "@/components/FilterBar";
import { Event } from "@/types/event";
import { EventFilter } from "@/types/filter";
import { fetcher } from "@/utils/fetcher";
import { filterEvents } from "@/utils/filterEvents";
import Head from "next/head";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

export default function Home() {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR<Event[]>("/api/events", fetcher);
  const [activeFilter, setActiveFilter] = useLocalStorageState<EventFilter>(
    "activeFilter",
    {
      defaultValue: "active",
    }
  );

  if (isLoading) return <p>Lade Events…</p>;
  if (error || !events) return <p>Fehler beim Laden der Events</p>;

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
        {events && events.length > 0 ? (
          <EventsGrid events={filteredEvents} />
        ) : (
          <p>Keine Events vorhanden.</p>
        )}
      </main>
    </>
  );
}
