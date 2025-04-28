import styled from "styled-components";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/event";

interface EventsGridProps {
  events: Event[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

function EventsGrid({ events }: EventsGridProps) {
  return (
    <Grid>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Grid>
  );
}

export default EventsGrid;
