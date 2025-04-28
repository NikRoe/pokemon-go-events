import styled from "styled-components";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/event";
import { motion, AnimatePresence } from "framer-motion";

interface EventsGridProps {
  events: Event[];
}

const Grid = styled(motion.div)`
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

const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

function EventsGrid({ events }: EventsGridProps) {
  return (
    <Grid
      variants={gridVariants}
      initial="visible"
      animate="visible"
      exit="visible"
    >
      <AnimatePresence>
        {events.map((event) => (
          <MotionCard
            key={event.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            layout
          >
            <EventCard event={event} />
          </MotionCard>
        ))}
      </AnimatePresence>
    </Grid>
  );
}

export default EventsGrid;
