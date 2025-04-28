import styled from "styled-components";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/event";
import { motion, AnimatePresence } from "framer-motion";

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

const MotionCard = styled(motion.div)`
  display: flex;
`;

function EventsGrid({ events }: EventsGridProps) {
  return (
    <Grid>
      <AnimatePresence>
        {events.map((event) => (
          <MotionCard
            key={event.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <EventCard event={event} />
          </MotionCard>
        ))}
      </AnimatePresence>
    </Grid>
  );
}

export default EventsGrid;
