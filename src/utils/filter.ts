import { Event } from "@/types/event";
import { EventAndRaidFilter } from "@/types/filter";

export function filter(events: Event[], filter: EventAndRaidFilter): Event[] {
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
