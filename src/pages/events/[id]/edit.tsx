import { useRouter } from "next/router";
import { Event, FrontendEvent } from "@/types/event";
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
    data: event,
    error,
    isLoading,
  } = useSWR<Event>(id ? `/api/events/${id}` : null);

  if (isLoading) return <p>Lade Event…</p>;
  if (error) return <p>Fehler beim Laden</p>;
  if (!event) return <p>Kein Event gefunden</p>;

  async function handleEditEvent(updatedEvent: FrontendEvent) {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!res.ok) {
        throw new Error("Fehler beim Speichern des Events");
      }

      await res.json();

      router.push(`/events/${id}`);
    } catch (err) {
      console.error(err);
      alert("Beim Speichern ist ein Fehler aufgetreten.");
    }
  }

  return (
    <>
      <Head>
        <title>Event bearbeiten | Pokémon GO Events</title>
        <meta name="description" content="Pokemon Go Event bearbeiten" />
      </Head>
      <PageContainer>
        <h1>Event bearbeiten</h1>
        <Form onSubmit={handleEditEvent} defaultValue={event} />
      </PageContainer>
    </>
  );
}
