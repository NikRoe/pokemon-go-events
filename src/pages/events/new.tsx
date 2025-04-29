import { useState } from "react";
import { useRouter } from "next/router";
import { eventSpecials } from "@/data/eventSpecials";
import { focusReasons } from "@/data/focusReasons";
import { focusPokemon } from "@/data/focusPokemon";
import { Event } from "@/types/event";
import styled from "styled-components";
import Remove from "@/assets/icons/remove.svg";

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

const TimeContaier = styled.div`
  display: flex;
  justify-content: space-evenly;
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

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ListItem = styled.li`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  font-size: large;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  svg {
    fill: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
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
    { pokemonId: number; reasons: number[] }[]
  >([]);

  function handleFocusChange(pokemonId: number, reasonId: number) {
    setSelectedFocus((prev) => {
      const index = prev.findIndex((focus) => focus.pokemonId === pokemonId);

      if (index !== -1) {
        const focus = prev[index];
        const hasReason = focus.reasons.includes(reasonId);
        const newReasons = hasReason
          ? focus.reasons.filter((reason) => reason !== reasonId)
          : [...focus.reasons, reasonId];

        if (newReasons.length === 0) {
          return prev.filter((_, i) => i !== index);
        }

        const updatedFocus = { ...focus, reasons: newReasons };
        return [
          ...prev.slice(0, index),
          updatedFocus,
          ...prev.slice(index + 1),
        ];
      } else {
        return [...prev, { pokemonId, reasons: [reasonId] }];
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
        reasons: focus.reasons,
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

        <TimeContaier>
          <FormGroup>
            <Label htmlFor="start">Startzeit*</Label>
            <Input id="start" name="start" type="datetime-local" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="end">Endzeit*</Label>
            <Input id="end" name="end" type="datetime-local" required />
          </FormGroup>
        </TimeContaier>

        <FormGroup>
          <Label htmlFor="preparation">Vorbereitung</Label>
          <Textarea id="preparation" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="specials">Besonderheiten*</Label>
          <Select
            id="specials"
            name="specials"
            value={""}
            onChange={(event) => {
              const selected = Number(event.target.value);
              setSelectedSpecials((prev) =>
                prev.includes(selected) ? prev : [selected, ...prev]
              );
            }}
            required={selectedSpecials.length === 0}
          >
            <option value="">
              ---Wähle eine oder mehrere Besonderheiten aus---
            </option>
            {eventSpecials.map((special) => (
              <option key={special.id} value={special.id}>
                {special.textContent}
              </option>
            ))}
          </Select>
        </FormGroup>

        <List>
          {selectedSpecials.map((specialId) => {
            const special = eventSpecials.find(
              (special) => special.id === specialId
            );
            if (!special) return null;

            return (
              <ListItem key={specialId}>
                {special.textContent}
                <RemoveButton
                  type="button"
                  onClick={() =>
                    setSelectedSpecials((prev) =>
                      prev.filter((entry) => entry !== specialId)
                    )
                  }
                  aria-label={`"${special.textContent}" entfernen`}
                >
                  <Remove width={20} height={20} />
                </RemoveButton>
              </ListItem>
            );
          })}
        </List>

        <FormGroup>
          <Label htmlFor="focus">Fokus-Pokémon*</Label>
          {focusPokemon.map((pokemon) => {
            const focusEntry = selectedFocus.find(
              (entry) => entry.pokemonId === pokemon.id
            );

            return (
              <div key={pokemon.id} style={{ marginBottom: "1rem" }}>
                <strong>{pokemon.pokemonName}</strong>
                <Select
                  onChange={(event) => {
                    const selected = Number(event.target.value);
                    if (selected) {
                      handleFocusChange(pokemon.id, selected);
                    }
                  }}
                  value=""
                >
                  <option value="">
                    ---Wähle einen oder mehrere Gründe aus---
                  </option>
                  {focusReasons.map((reason) => (
                    <option key={reason.id} value={reason.id}>
                      {reason.textContent}
                    </option>
                  ))}
                </Select>

                {focusEntry && focusEntry.reasons.length > 0 && (
                  <List>
                    {focusEntry.reasons.map((reasonId) => {
                      const reason = focusReasons.find(
                        (focusReason) => focusReason.id === reasonId
                      );
                      if (!reason) return null;

                      return (
                        <ListItem key={reasonId}>
                          {reason.textContent}
                          <RemoveButton
                            type="button"
                            onClick={() =>
                              handleFocusChange(pokemon.id, reasonId)
                            }
                            aria-label={`"${reason.textContent}" entfernen`}
                          >
                            <Remove width={20} height={20} />
                          </RemoveButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </div>
            );
          })}
        </FormGroup>

        <SubmitButton type="submit">Event speichern</SubmitButton>
      </FormContainer>
    </PageContainer>
  );
}
