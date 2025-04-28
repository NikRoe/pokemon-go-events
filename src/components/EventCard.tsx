import { Event } from "@/types/event";
import styled from "styled-components";

interface EventCardProps {
  event: Event;
}

const Card = styled.article`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    <Card>
      <h2>{event.name}</h2>
      <time>
        {formatDate(event.start)} {formatTime(event.start)} –{" "}
        {formatDate(event.end)} {formatTime(event.end)}
      </time>
      {event.preparation && (
        <p>
          <strong>Vorbereitung:</strong> {event.preparation}
        </p>
      )}
      <TagList>
        {event.focus.map((focus) => (
          <Tag key={focus.pokemonName}>{focus.pokemonName}</Tag>
        ))}
      </TagList>
    </Card>
  );
}
