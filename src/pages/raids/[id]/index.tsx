import { useRouter } from "next/router";
import PokemonGrid from "@/components/PokemonGrid";
import Head from "next/head";
import { Event } from "@/types/event";
import useSWR from "swr";
import {
  Container,
  DialogActions,
  Section,
  StyledDialog,
  SubTitle,
} from "@/components/DetailView/DetailView.styled";
import { useRef } from "react";
import Overview from "@/components/DetailView/Overview";

export default function RaidDetailPage() {
  const router = useRouter();

  const id = router.query.id as string;

  const {
    data: raid,
    error,
    isLoading,
  } = useSWR<Event>(id ? `/api/raids/${id}` : null);

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  function handleModalClick() {
    dialogRef.current?.showModal();
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
        <Overview
          event={raid}
          id={id}
          onClick={handleModalClick}
          isForRaid={true}
        />
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
