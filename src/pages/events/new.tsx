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

const FocusCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

const FocusCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const FocusCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FocusSelect = styled(Select)`
  margin-top: 0.5rem;
`;

const ReasonsList = styled(List)`
  margin-top: 0.5rem;
`;

const ReasonItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface NewEventPageProps {
  onAddEvent: (newEvent: Event) => void;
}

export default function NewEventPage({ onAddEvent }: NewEventPageProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPokemon = focusPokemon
    .filter(
      (pokemon) =>
        pokemon.pokemonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString() === searchTerm
    )
    .filter(
      (pokemon) =>
        !selectedFocus.some((focus) => focus.pokemonId === pokemon.id)
    );

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
            {eventSpecials
              .filter((special) => !selectedSpecials?.includes(special.id))
              .map((special) => (
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

          <FormGroup>
            <Label htmlFor="search">Pokémon suchen</Label>
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Name oder ID eingeben..."
            />
          </FormGroup>
          {searchTerm && (
            <List>
              {filteredPokemon.map((pokemon) => (
                <ListItem key={pokemon.id}>
                  {pokemon.pokemonName} (ID: {pokemon.id})
                  <RemoveButton
                    type="button"
                    onClick={() => {
                      setSelectedFocus((prev) => [
                        ...prev,
                        { pokemonId: pokemon.id, reasons: [] },
                      ]);
                      setSearchTerm("");
                    }}
                  >
                    Hinzufügen
                  </RemoveButton>
                </ListItem>
              ))}
            </List>
          )}
          <FocusCardContainer>
            {selectedFocus.map((focusEntry) => {
              const singlePokemon = focusPokemon.find(
                (p) => p.id === focusEntry.pokemonId
              );

              if (!singlePokemon) return null;

              return (
                <FocusCard key={singlePokemon.id}>
                  <FocusCardHeader>
                    <strong>{singlePokemon?.pokemonName}</strong>
                    <RemoveButton
                      type="button"
                      onClick={() =>
                        setSelectedFocus(
                          selectedFocus.filter(
                            (focus) => focus.pokemonId !== singlePokemon.id
                          )
                        )
                      }
                      aria-label={`"${singlePokemon.pokemonName}" entfernen`}
                    >
                      <Remove width={20} height={20} />
                    </RemoveButton>
                  </FocusCardHeader>

                  <FocusSelect
                    onChange={(event) => {
                      const selected = Number(event.target.value);
                      if (selected) {
                        handleFocusChange(singlePokemon.id, selected);
                      }
                    }}
                    value=""
                  >
                    <option value="">--- Wähle Gründe aus ---</option>
                    {focusReasons
                      .filter(
                        (reason) => !focusEntry?.reasons.includes(reason.id)
                      )
                      .map((reason) => (
                        <option key={reason.id} value={reason.id}>
                          {reason.textContent}
                        </option>
                      ))}
                  </FocusSelect>

                  {focusEntry && focusEntry.reasons.length > 0 && (
                    <ReasonsList>
                      {focusEntry.reasons.map((reasonId) => {
                        const reason = focusReasons.find(
                          (focusReason) => focusReason.id === reasonId
                        );
                        if (!reason) return null;

                        return (
                          <ReasonItem key={reasonId}>
                            {reason.textContent}
                            <RemoveButton
                              type="button"
                              onClick={() =>
                                handleFocusChange(singlePokemon.id, reasonId)
                              }
                              aria-label={`"${reason.textContent}" entfernen`}
                            >
                              <Remove width={20} height={20} />
                            </RemoveButton>
                          </ReasonItem>
                        );
                      })}
                    </ReasonsList>
                  )}
                </FocusCard>
              );
            })}
          </FocusCardContainer>
        </FormGroup>

        <SubmitButton type="submit">Event speichern</SubmitButton>
      </FormContainer>
    </PageContainer>
  );
}
