import { useRouter } from "next/router";
import { FrontendEvent } from "@/types/event";
import styled from "styled-components";
import Head from "next/head";
import Form from "@/components/Form";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;

  padding: 1rem;

  @media (min-width: 600px) {
    padding: 2rem;
  }
`;

export default function NewEventPage() {
  const router = useRouter();

  async function handleAddEvent(newEvent: FrontendEvent) {
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) {
        throw new Error("Fehler beim Speichern des Events");
      }

      await res.json();

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Beim Speichern ist ein Fehler aufgetreten.");
    }
  }

  return (
    <>
      <Head>
        <title>Neues Event hinzufügen | Pokémon GO Events</title>
        <meta name="description" content="Neues Pokemon Go Event hinzufügen" />
      </Head>
      <PageContainer>
        <h1>Neues Event hinzufügen</h1>
        <Form onSubmit={handleAddEvent} />
      </PageContainer>
    </>
  );
}
