import EventsGrid from "@/components/EventsGrid";
import FilterBar from "@/components/FilterBar";
import ModeBar from "@/components/ModeBar";
import { Event } from "@/types/event";
import { EventAndRaidFilter } from "@/types/filter";
import { filter as filterEventsOrRaids } from "@/utils/filter";
import Head from "next/head";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

export default function Home() {
  const { data: events, error, isLoading } = useSWR<Event[]>("/api/events");
  const {
    data: raids,
    error: raidError,
    isLoading: raidIsLoading,
  } = useSWR<Event[]>("/api/raids");
  const [mode, setMode] = useLocalStorageState("mode", {
    defaultValue: "event",
  });
  const [activeEventFilter, setActiveEventFilter] =
    useLocalStorageState<EventAndRaidFilter>("activeEventFilter", {
      defaultValue: "active",
    });
  const [activeRaidFilter, setActiveRaidFilter] =
    useLocalStorageState<EventAndRaidFilter>("activeRaidFilter", {
      defaultValue: "active",
    });

  if (isLoading || raidIsLoading) return <p>Lade Events…</p>;
  if (error || !events || raidError || !raids)
    return <p>Fehler beim Laden der Events</p>;

  const filteredEvents = filterEventsOrRaids(events, activeEventFilter);
  const filteredRaids = filterEventsOrRaids(raids, activeRaidFilter);

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

          {raids && filteredRaids.length > 0 ? (
            <EventsGrid events={filteredRaids} isRaidGrid={true} />
          ) : (
            <p>Keine Raids vorhanden.</p>
          )}
        </>
      )}
    </>
  );
}
