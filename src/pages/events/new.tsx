import { useState } from "react";
import { useRouter } from "next/router";
import { eventSpecials } from "@/data/eventSpecials";
import { focusReasons } from "@/data/focusReasons";
import { focusPokemon } from "@/data/focusPokemon";
import { Event } from "@/types/event";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

interface NewEventPageProps {
  onAddEvent: (newEvent: Event) => void;
}

export default function NewEventPage({ onAddEvent }: NewEventPageProps) {
  const router = useRouter();

  const [selectedSpecials, setSelectedSpecials] = useState<number[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<
    { pokemonId: number; reasonIds: number[] }[]
  >([]);

  function handleFocusChange(pokemonId: number, reasonIds: number[]) {
    setSelectedFocus((prev) => {
      const existing = prev.find((focus) => focus.pokemonId === pokemonId);
      if (existing) {
        return prev.map((focus) =>
          focus.pokemonId === pokemonId ? { ...focus, reasonIds } : focus
        );
      } else {
        return [...prev, { pokemonId, reasonIds }];
      }
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const data = Object.fromEntries(formData) as Pick<
      Event,
      "name" | "start" | "end" | "preparation"
    >;

    const focus = selectedFocus.map((focus) => {
      const name =
        focusPokemon.find((pokemon) => pokemon.id === focus.pokemonId)
          ?.pokemonName ?? "Unbekannt";
      return {
        id: focus.pokemonId,
        pokemonName: name,
        reasons: focus.reasonIds,
      };
    });

    const newEvent: Event = {
      id: Date.now(),
      ...data,
      preparation: data.preparation || null,
      specials: selectedSpecials,
      focus,
    };

    onAddEvent(newEvent);

    router.push("/");
  }

  return (
    <PageContainer>
      <h1>Neues Event hinzufügen</h1>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Event-Name*</Label>
          <Input id="name" name="name" required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="start">Startzeit*</Label>
          <Input id="start" name="start" type="datetime-local" required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="end">Endzeit*</Label>
          <Input id="end" name="end" type="datetime-local" required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="preparation">Vorbereitung</Label>
          <Textarea id="preparation" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="specials">Besonderheiten*</Label>
          <Select
            id="specials"
            name="specials"
            multiple
            value={selectedSpecials.map(String)}
            onChange={(event) => {
              const selected = Array.from(event.target.selectedOptions).map(
                (option) => Number(option.value)
              );
              setSelectedSpecials(selected);
            }}
            required
          >
            {eventSpecials.map((special) => (
              <option key={special.id} value={special.id}>
                {special.textContent}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="focus">Fokus-Pokémon*</Label>
          {focusPokemon.map((pokemon) => (
            <FormGroup key={pokemon.id} style={{ marginBottom: "1rem" }}>
              <strong>{pokemon.pokemonName}</strong>
              <Select
                id="focus"
                name="focus"
                multiple
                onChange={(event) => {
                  const selected = Array.from(event.target.selectedOptions).map(
                    (option) => Number(option.value)
                  );
                  handleFocusChange(pokemon.id, selected);
                }}
              >
                {focusReasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.textContent}
                  </option>
                ))}
              </Select>
            </FormGroup>
          ))}
        </FormGroup>

        <SubmitButton type="submit">Event speichern</SubmitButton>
      </FormContainer>
    </PageContainer>
  );
}
