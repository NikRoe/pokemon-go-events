import { useState } from "react";
import { useRouter } from "next/router";
import { eventSpecials } from "@/data/eventSpecials";
import { focusReasons } from "@/data/focusReasons";
import { focusPokemon } from "@/data/focusPokemon";
import { Event } from "@/types/event";

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
    <div style={{ padding: "2rem" }}>
      <h1>Neues Event hinzufügen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event-Name*</label>
          <input id="name" name="name" required />
        </div>

        <div>
          <label htmlFor="start">Startzeit*</label>
          <input id="start" name="start" type="datetime-local" required />
        </div>

        <div>
          <label htmlFor="end">Endzeit*</label>
          <input id="end" name="end" type="datetime-local" required />
        </div>

        <div>
          <label htmlFor="preparation">Vorbereitung</label>
          <textarea id="preparation" />
        </div>

        <div>
          <label htmlFor="specials">Besonderheiten*</label>
          <select
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
          </select>
        </div>

        <div>
          <label htmlFor="focus">Fokus-Pokémon*</label>
          {focusPokemon.map((pokemon) => (
            <div key={pokemon.id} style={{ marginBottom: "1rem" }}>
              <strong>{pokemon.pokemonName}</strong>
              <select
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
              </select>
            </div>
          ))}
        </div>

        <button type="submit">Event speichern</button>
      </form>
    </div>
  );
}
