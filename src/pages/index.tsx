import EventsGrid from "@/components/EventsGrid";
import FilterBar from "@/components/FilterBar";
import ModeBar from "@/components/ModeBar";
import { Event, EventBasicAndId } from "@/types/event";
import { EventAndRaidFilter } from "@/types/filter";
import { filterEvents, filterRaids } from "@/utils/filter";
import Head from "next/head";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

const dummmyRaid: EventBasicAndId[] = [
  {
    _id: "1",
    name: "Mega-Raids: Groudon",
    start: "2025-06-05T10:00",
    end: "2025-06-14T10:00",
    preparation: "Team aus Wasser, Grass und Eis zusammenstellen.",
    focus: [
      {
        id: 383,
        pokemonName: "Groudon",
        reasons: [1],
      },
    ],
    priority: 5,
  },
];

export default function Home() {
  const { data: events, error, isLoading } = useSWR<Event[]>("/api/events");
  const {
    data: raid,
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
  if (error || !events || raidError || !raid)
    return <p>Fehler beim Laden der Events</p>;

  const filteredEvents = filterEvents(events, activeEventFilter);
  const filteredRaids = filterRaids(raid, activeRaidFilter);

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

          {dummmyRaid && filteredRaids.length > 0 ? (
            <EventsGrid events={filteredRaids} />
          ) : (
            <p>Keine Raids vorhanden.</p>
          )}
        </>
      )}
    </>
  );
}
