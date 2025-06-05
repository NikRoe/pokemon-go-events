import { useRouter } from "next/router";
import { eventSpecials } from "@/data/eventSpecials";
import PokemonGrid from "@/components/PokemonGrid";
import Head from "next/head";
import { Event } from "@/types/event";
import useSWR from "swr";
import { useRef } from "react";
import {
  Container,
  DialogActions,
  Section,
  StyledDialog,
  SubTitle,
} from "@/components/DetailView/DetailView.styled";
import Overview from "@/components/DetailView/Overview";

export default function EventDetailPage() {
  const router = useRouter();

  const id = router.query.id as string;

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

  function handleModalClick() {
    dialogRef.current?.showModal();
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
        <Overview event={event} id={id} onClick={handleModalClick} />

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
