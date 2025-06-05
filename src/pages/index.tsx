import EventsGrid from "@/components/EventsGrid";
import FilterBar from "@/components/FilterBar";
import ModeBar from "@/components/ModeBar";
import { Event } from "@/types/event";
import { EventAndRaidFilter } from "@/types/filter";
import { filterEvents } from "@/utils/filterEvents";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

export default function Home() {
  const { data: events, error, isLoading } = useSWR<Event[]>("/api/events");
  const [mode, setMode] = useState("event");
  const [activeEventFilter, setActiveEventFilter] =
    useLocalStorageState<EventAndRaidFilter>("activeEventFilter", {
      defaultValue: "active",
    });
  const [activeRaidFilter, setActiveRaidFilter] =
    useLocalStorageState<EventAndRaidFilter>("activeRaidFilter", {
      defaultValue: "active",
    });

  if (isLoading) return <p>Lade Events…</p>;
  if (error || !events) return <p>Fehler beim Laden der Events</p>;

  const filteredEvents = filterEvents(events, activeEventFilter);

  function handleEventFilterClick(filter: EventAndRaidFilter) {
    if (filter === activeEventFilter) {
      setActiveEventFilter(null);
    } else {
      setActiveEventFilter(filter);
    }
  }

  function handleRaidFilterClick(filter: EventAndRaidFilter) {
    if (filter === activeRaidFilter) {
      setActiveRaidFilter(null);
    } else {
      setActiveRaidFilter(filter);
    }
  }

  function handleModeClick(newMode: string) {
    setMode(newMode);
  }

  return (
    <>
      <Head>
        <title>Pokemon Go Events & Raids</title>
      </Head>

      <ModeBar mode={mode} onModeClick={handleModeClick} />

      {mode === "event" && (
        <>
          <FilterBar
            activeFilter={activeEventFilter}
            onFilterClick={handleEventFilterClick}
          />
          {events && filteredEvents.length > 0 ? (
            <EventsGrid events={filteredEvents} />
          ) : (
            <p>Keine Events vorhanden.</p>
          )}
        </>
      )}

      {mode === "raid" && (
        <>
          <FilterBar
            activeFilter={activeRaidFilter}
            onFilterClick={handleRaidFilterClick}
          />
          <p>Hier kommt noch was</p>
          {/* Überarbeiten */}

          {/* {events && events.length > 0 ? (
            <EventsGrid events={filteredEvents} />
          ) : (
            <p>Keine Raids vorhanden.</p>
          )} */}
        </>
      )}
    </>
  );
}
