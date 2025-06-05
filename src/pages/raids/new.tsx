import { useRouter } from "next/router";
import { EventDetail } from "@/types/event";
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

export default function NewRaidPage() {
  const router = useRouter();

  async function handleAddRaid(newRaid: EventDetail) {
    try {
      const res = await fetch("/api/raids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRaid),
      });

      if (!res.ok) {
        throw new Error("Fehler beim Speichern des Raids");
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
        <title>Neuen Raid hinzufügen | Pokémon GO Events & Raids</title>
        <meta name="description" content="Neuen Pokemon Go Raid hinzufügen" />
      </Head>
      <PageContainer>
        <h1>Neuen Raid hinzufügen</h1>
        <Form onSubmit={handleAddRaid} isRaidForm={true} />
      </PageContainer>
    </>
  );
}
