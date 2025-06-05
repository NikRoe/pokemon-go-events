import { useRouter } from "next/router";
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

export default function RaidDetailPage() {
  const router = useRouter();

  const { id } = router.query;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    data: raid,
    error,
    isLoading,
  } = useSWR<Event>(id ? `/api/raids/${id}` : null);

  if (isLoading) return <p>Lade Raid</p>;
  if (error) return <p>Fehler beim Laden</p>;
  if (!raid) return <p>Kein Raid gefunden</p>;

  async function handleDelete() {
    try {
      const response = await fetch(`/api/raids/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Löschen fehlgeschlagen");
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen des Raids");
    }
  }

  return (
    <>
      <Head>
        <title>{`${raid.name} | Pokémon GO Events & Raids`}</title>
        <meta
          name="description"
          content={`Alle Infos zum Raid "${raid.name}" in Pokémon GO.`}
        />
      </Head>
      <Container>
        <EventOverview>
          <TitleRow>
            <Title>{raid.name}</Title>
            <ButtonContainer>
              <Button
                as={Link}
                href={`/raids/${id}/edit`}
                aria-label="Raid bearbeiten"
                size="64px"
              >
                <Edit />
              </Button>
              <Button
                onClick={() => dialogRef.current?.showModal()}
                type="button"
                aria-label="Raid löschen"
                size="48px"
                $isDelete
              >
                <Delete />
              </Button>
            </ButtonContainer>
          </TitleRow>
          <TimeInfo>
            {formatDateTimeWithWeekday(raid.start)} -{" "}
            {formatDateTimeWithWeekday(raid.end)}
          </TimeInfo>

          <PriorityBadge priority={raid.priority || 1}>
            Priorität: {priorityLevels[raid.priority || 1]} ({raid.priority} /
            5)
          </PriorityBadge>

          <Section>
            <SubTitle>Vorbereitung</SubTitle>
            <p>{raid.preparation || "Keine"}</p>
          </Section>

          <strong>Empfohlene Mega-Entwicklung(en):</strong>
          {raid.recommendedMegas.length > 0 ? (
            <MegaRecommendation>
              {raid.recommendedMegas?.map((megaPokemon) => {
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

        {raid.focus.length > 0 && (
          <Section>
            <SubTitle>Fokussierte Pokémon</SubTitle>
            <PokemonGrid event={raid} />
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
