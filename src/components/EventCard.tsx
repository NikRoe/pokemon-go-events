import { EventBasicAndId } from "@/types/event";
import styled from "styled-components";
import Link from "next/link";

interface EventCardProps {
  event: EventBasicAndId;
}

const Card = styled(Link)`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  transition: background-color 0.5s ease, color 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimeRange = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.li`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
`;

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card href={`/events/${event._id}`}>
      <h2>{event.name}</h2>

      <TimeRange>
        <time dateTime={event.start}>
          {formatDate(event.start)} {formatTime(event.start)}
        </time>{" "}
        –{" "}
        <time dateTime={event.end}>
          {formatDate(event.end)} {formatTime(event.end)}
        </time>
      </TimeRange>

      <p>
        <strong>Vorbereitung:</strong> {event.preparation || "keine"}
      </p>

      <TagList>
        {event.focus.map((focus) => (
          <Tag key={focus.pokemonName}>{focus.pokemonName}</Tag>
        ))}
      </TagList>
    </Card>
  );
}
