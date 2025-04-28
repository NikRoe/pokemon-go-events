import { Event } from "@/types/event";
import { EventFilter } from "@/types/filter";

export function filterEvents(events: Event[], filter: EventFilter): Event[] {
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
