import { useRouter } from "next/router";
import { Event, EventDetail } from "@/types/event";
import styled from "styled-components";
import Head from "next/head";
import Form from "@/components/Form";
import useSWR from "swr";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;

  padding: 1rem;

  @media (min-width: 600px) {
    padding: 2rem;
  }
`;

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: raid,
    error,
    isLoading,
  } = useSWR<Event>(id ? `/api/raids/${id}` : null);

  if (isLoading) return <p>Lade Raid...</p>;
  if (error) return <p>Fehler beim Laden</p>;
  if (!raid) return <p>Kein Raid gefunden</p>;

  async function handleEditRaid(updatedRaid: EventDetail) {
    try {
      const res = await fetch(`/api/raids/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRaid),
      });

      if (!res.ok) {
        throw new Error("Fehler beim Speichern des Raids");
      }

      await res.json();

      router.push(`/raids/${id}`);
    } catch (err) {
      console.error(err);
      alert("Beim Speichern ist ein Fehler aufgetreten.");
    }
  }

  return (
    <>
      <Head>
        <title>Raid bearbeiten | Pokémon GO Events & Raids</title>
        <meta name="description" content="Pokemon Go Raid bearbeiten" />
      </Head>
      <PageContainer>
        <h1>Raid bearbeiten</h1>
        <Form onSubmit={handleEditRaid} defaultValue={raid} isRaidForm={true} />
      </PageContainer>
    </>
  );
}
