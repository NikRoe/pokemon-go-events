import { useRouter } from "next/router";
import { eventSpecials } from "@/data/eventSpecials";
import PokemonGrid from "@/components/PokemonGrid";
import Head from "next/head";
import { Event } from "@/types/event";
import useSWR from "swr";
import { useRef } from "react";
import Delete from "@/assets/icons/delete.svg";
import Edit from "@/assets/icons/edit.svg";
import Link from "next/link";
import { formatDateTimeWithWeekday } from "@/utils/formatDateTimeWithWeekday";
import { priorityLevels } from "@/data/priorityLevels";
import Image from "next/image";
import {
  ActionItem,
  ActionList,
  Button,
  ButtonContainer,
  Container,
  DialogActions,
  EventOverview,
  Heading,
  MegaRecommendation,
  PriorityBadge,
  Section,
  StyledDialog,
  SubTitle,
  TimeInfo,
  Title,
  TitleRow,
} from "@/components/DetailView.styled";
import { PokemonImageWrapper } from "@/components/Form.styled";

export default function EventDetailPage() {
  const router = useRouter();

  const { id } = router.query;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    data: event,
    error,
    isLoading,
  } = useSWR<Event>(id ? `/api/events/${id}` : null);

  if (isLoading) return <p>Lade Event…</p>;
  if (error) return <p>Fehler beim Laden</p>;
  if (!event) return <p>Kein Event gefunden</p>;

  async function handleDelete() {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Löschen fehlgeschlagen");
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen des Events");
    }
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
        <EventOverview>
          <TitleRow>
            <Title>{event.name}</Title>
            <ButtonContainer>
              <Button
                as={Link}
                href={`/events/${id}/edit`}
                aria-label="Event bearbeiten"
                size="64px"
              >
                <Edit />
              </Button>
              <Button
                onClick={() => dialogRef.current?.showModal()}
                type="button"
                aria-label="Event löschen"
                size="48px"
                $isDelete
              >
                <Delete />
              </Button>
            </ButtonContainer>
          </TitleRow>
          <TimeInfo>
            {formatDateTimeWithWeekday(event.start)} -{" "}
            {formatDateTimeWithWeekday(event.end)}
          </TimeInfo>

          <PriorityBadge priority={event.priority || 1}>
            Priorität: {priorityLevels[event.priority || 1]} ({event.priority} /
            5)
          </PriorityBadge>

          <Section>
            <SubTitle>Vorbereitung</SubTitle>
            <p>{event.preparation || "Keine"}</p>
          </Section>

          <h3>Erste Schritte, wenn das Event startet:</h3>

          <ActionList>
            {event.steps?.map((step) => (
              <ActionItem key={step}>{step}</ActionItem>
            ))}
          </ActionList>
          <strong>Empfohlene Mega-Entwicklung(en):</strong>
          {event.recommendedMegas.length > 0 ? (
            <MegaRecommendation>
              {event.recommendedMegas?.map((megaPokemon) => {
                return (
                  <span key={megaPokemon.id}>
                    {" "}
                    <PokemonImageWrapper>
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemon.id}.png`}
                        alt={megaPokemon.pokemonName}
                        fill={true}
                      />
                    </PokemonImageWrapper>
                    <Heading>{megaPokemon.pokemonName}</Heading>
                  </span>
                );
              })}
            </MegaRecommendation>
          ) : (
            <p>Keine</p>
          )}
        </EventOverview>

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

        <StyledDialog ref={dialogRef}>
          <p>Möchtest du dieses Event wirklich löschen?</p>
          <DialogActions method="dialog">
            <button onClick={handleDelete}>Ja, löschen</button>
            <button type="submit">Abbrechen</button>
          </DialogActions>
        </StyledDialog>
      </Container>
    </>
  );
}
