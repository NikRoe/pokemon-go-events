import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { events } from "@/data/events";
import { eventSpecials } from "@/data/eventSpecials";
import { Event } from "@/types/event";
import styled from "styled-components";
import Link from "next/link";
import PokemonGrid from "@/components/PokemonGrid";

interface EventDetailPageProps {
  event: Event | null;
}

const Container = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TimeInfo = styled.time`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  text-decoration: none;
  margin-top: 2rem;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event nicht gefunden</div>;
  }

  return (
    <Container>
      <Title>{event.name}</Title>
      <TimeInfo>
        {new Date(event.start).toLocaleString("de-DE")} –{" "}
        {new Date(event.end).toLocaleString("de-DE")}
      </TimeInfo>

      <Section>
        <SubTitle>Vorbereitung</SubTitle>
        <p>{event.preparation || "Keine"}</p>
      </Section>

      {event.specials.length > 0 && (
        <Section>
          <SubTitle>Besonderheiten</SubTitle>
          <ul>
            {event.specials.map((specialId) => {
              const special = eventSpecials.find(
                (eventSpecial) => eventSpecial.id === specialId
              );
              return special ? (
                <li key={specialId}>{special.textContent}</li>
              ) : null;
            })}
          </ul>
        </Section>
      )}

      {event.focus.length > 0 && (
        <Section>
          <SubTitle>Fokussierte Pokémon</SubTitle>
          <PokemonGrid event={event} />
        </Section>
      )}

      <BackLink href="/">← Zurück zur Übersicht</BackLink>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = events.map((event) => ({
    params: { id: event.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  if (!id || Array.isArray(id)) {
    return { props: { event: null } };
  }

  const event = events.find((event) => event.id === parseInt(id, 10)) || null;

  return {
    props: { event },
    revalidate: 60,
  };
};
