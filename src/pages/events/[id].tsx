import { useRouter } from "next/router";
import { eventSpecials } from "@/data/eventSpecials";
import { Event } from "@/types/event";
import styled from "styled-components";
import Link from "next/link";
import PokemonGrid from "@/components/PokemonGrid";
import Head from "next/head";

interface EventDetailPageProps {
  events: Event[];
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

export default function EventDetailPage({ events }: EventDetailPageProps) {
  const router = useRouter();

  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const event = events.find(
    (singleEvent: Event) => singleEvent.id === Number(id)
  );

  if (!event) {
    return <div>Event konnte nicht gefunden werden</div>;
  }

  return (
    <>
      <Head>
        <title>{`${event.name} | Pokémon GO Events`}</title>
        <meta
          name="description"
          content={`Alle Infos zum Event "${event.name}" in Pokémon GO.`}
        />
      </Head>
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
    </>
  );
}
