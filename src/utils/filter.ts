import { Event, EventBasicAndId } from "@/types/event";
import { EventAndRaidFilter } from "@/types/filter";

export function filterEvents(
  events: Event[],
  filter: EventAndRaidFilter
): Event[] {
  const now = new Date();

  switch (filter) {
    case "active":
      return events.filter(
        (event) => new Date(event.start) <= now && new Date(event.end) >= now
      );
    case "past":
      return events.filter((event) => new Date(event.end) < now);
    case "upcoming":
      return events.filter((event) => new Date(event.start) > now);
    case null:
    default:
      return events;
  }
}

export function filterRaids(
  raids: EventBasicAndId[],
  filter: EventAndRaidFilter
): EventBasicAndId[] {
  const now = new Date();

  switch (filter) {
    case "active":
      return raids.filter(
        (raid) => new Date(raid.start) <= now && new Date(raid.end) >= now
      );
    case "past":
      return raids.filter((raid) => new Date(raid.end) < now);
    case "upcoming":
      return raids.filter((raid) => new Date(raid.start) > now);
    case null:
    default:
      return raids;
  }
}
