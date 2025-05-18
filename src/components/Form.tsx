import Image from "next/image";
import Remove from "@/assets/icons/remove.svg";
import { eventSpecials } from "@/data/eventSpecials";
import { focusReasons } from "@/data/focusReasons";
import { pokemonList } from "@/data/pokemonList";
import { useState } from "react";
import { Event, EventPriority, FrontendEvent } from "@/types/event";
import FirstStepsInput from "./FirstStepsInput";
import Priority from "./EventPriority";
import {
  DateTimeInput,
  FormContainer,
  FormGroup,
  Input,
  Label,
  List,
  ListItem,
  RemoveButton,
  SubmitButton,
  Textarea,
  TimeContainer,
  Select,
  FocusCardContainer,
  FocusCard,
  FocusCardHeader,
  PokemonImageWrapper,
  FocusSelect,
  ReasonsList,
  ReasonItem,
} from "./Form.styled";
import Search from "./Search";

export default function Form({
  onSubmit,
  defaultValue,
}: {
  onSubmit: (newEvent: FrontendEvent) => void;
  defaultValue?: Event;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [megaSearchTerm, setMegaSearchTerm] = useState("");
  const [selectedSpecials, setSelectedSpecials] = useState<number[]>(
    defaultValue?.specials || []
  );
  const [selectedFocus, setSelectedFocus] = useState<
    { id: number; reasons: number[] }[]
  >(defaultValue?.focus || []);
  const [recommendedMegas, setRecommendedMegas] = useState<
    { id: number; pokemonName: string }[]
  >(defaultValue?.recommendedMegas || []);
  const [firstSteps, setFirstSteps] = useState<string[]>(
    defaultValue?.steps || []
  );
  const [priority, setPriority] = useState<EventPriority>(
    defaultValue?.priority || 1
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name")?.toString() ?? "",
      start: formData.get("start")?.toString() ?? "",
      end: formData.get("end")?.toString() ?? "",
      preparation: formData.get("preparation")?.toString() ?? "",
      priority: (Number(formData.get("priority")) as EventPriority) || 3,
      recommendedMegas: formData.getAll("recommendedMegas").map((v) => {
        return JSON.parse(v.toString()) as {
          id: number;
          pokemonName: string;
        };
      }),
    } satisfies Pick<
      Event,
      "name" | "start" | "end" | "preparation" | "priority" | "recommendedMegas"
    >;

    const focus = selectedFocus.map((focus) => {
      const name =
        pokemonList.find((pokemon) => pokemon.id === focus.id)?.pokemonName ??
        "Unbekannt";
      return {
        id: focus.id,
        pokemonName: name,
        reasons: focus.reasons,
      };
    });

    const newEvent: FrontendEvent = {
      ...data,
      preparation: data.preparation || null,
      specials: selectedSpecials,
      focus,
      steps: firstSteps,
      recommendedMegas,
    };

    onSubmit(newEvent);
  }

  function handlePriorityChange(event: React.ChangeEvent) {
    const inputElement = event.target as HTMLInputElement;
    const newPriority = Number(inputElement.value) as EventPriority;

    setPriority(newPriority);
  }

  function handleFocusChange(id: number, reasonId: number) {
    setSelectedFocus((prev) => {
      const index = prev.findIndex((focus) => focus.id === id);

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
        return [...prev, { id, reasons: [reasonId] }];
      }
    });
  }

  const filteredPokemon = pokemonList
    .filter(
      (pokemon) =>
        pokemon.pokemonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString() === searchTerm
    )
    .filter(
      (pokemon) => !selectedFocus.some((focus) => focus.id === pokemon.id)
    );

  const filteredMegaPokemon = pokemonList
    .filter(
      (pokemon) =>
        pokemon.pokemonName
          .toLowerCase()
          .includes(megaSearchTerm.toLowerCase()) ||
        pokemon.id.toString() === megaSearchTerm
    )
    .filter(
      (pokemon) => !recommendedMegas.some((focus) => focus.id === pokemon.id)
    );

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Event-Name*</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={defaultValue?.name}
        />
      </FormGroup>

      <TimeContainer>
        <FormGroup>
          <Label htmlFor="start">Startzeit*</Label>
          <DateTimeInput
            id="start"
            name="start"
            type="datetime-local"
            defaultValue={defaultValue?.start}
            required
            step={300}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="end">Endzeit*</Label>
          <DateTimeInput
            id="end"
            name="end"
            type="datetime-local"
            defaultValue={defaultValue?.end}
            required
            step={300}
          />
        </FormGroup>
      </TimeContainer>

      <Priority priority={priority} onPriorityChange={handlePriorityChange} />

      <FormGroup>
        <Label htmlFor="preparation">Vorbereitung</Label>
        <Textarea
          id="preparation"
          name="preparation"
          defaultValue={defaultValue?.preparation ?? ""}
        />
      </FormGroup>

      <FirstStepsInput firstSteps={firstSteps} setFirstSteps={setFirstSteps} />

      <Search
        title="Empfohlene Mega-Entwicklungen"
        searchTerm={megaSearchTerm}
        handleChange={(event: string) => setMegaSearchTerm(event)}
        searchSuggestions={filteredMegaPokemon}
        handlePokemonClick={(pokemon) =>
          setRecommendedMegas((prev) => [...prev, pokemon])
        }
        searchResults={recommendedMegas}
        handleRemovePokemon={(id) =>
          setRecommendedMegas(
            recommendedMegas.filter((focus) => focus.id !== id)
          )
        }
      />

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
            {filteredPokemon.slice(0, 10).map((pokemon) => (
              <ListItem
                key={pokemon.id}
                onClick={() => {
                  setSelectedFocus((prev) => [
                    ...prev,
                    { id: pokemon.id, reasons: [] },
                  ]);
                }}
                $isClickable
                $searchResult
              >
                <PokemonImageWrapper>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.pokemonName}
                    fill={true}
                  />
                </PokemonImageWrapper>

                <h3>
                  {pokemon.pokemonName} <br /> (ID: {pokemon.id})
                </h3>
              </ListItem>
            ))}
          </List>
        )}
        <FocusCardContainer>
          {selectedFocus.map((focusEntry) => {
            const singlePokemon = pokemonList.find(
              (p) => p.id === focusEntry.id
            );

            if (!singlePokemon) return null;

            return (
              <FocusCard key={singlePokemon.id}>
                <FocusCardHeader>
                  <PokemonImageWrapper>
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${singlePokemon.id}.png`}
                      alt={singlePokemon.pokemonName}
                      fill={true}
                    />
                  </PokemonImageWrapper>

                  <strong>{singlePokemon?.pokemonName}</strong>
                  <RemoveButton
                    type="button"
                    onClick={() =>
                      setSelectedFocus(
                        selectedFocus.filter(
                          (focus) => focus.id !== singlePokemon.id
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
  );
}
