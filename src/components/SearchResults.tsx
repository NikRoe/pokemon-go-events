import { pokemonList } from "@/data/pokemonList";
import {
  FocusCard,
  FocusCardContainer,
  FocusCardHeader,
  FocusSelect,
  PokemonImageWrapper,
  ReasonItem,
  ReasonsList,
  RemoveButton,
} from "./Form.styled";
import Image from "next/image";
import Remove from "@/assets/icons/remove.svg";
import { focusReasons } from "@/data/focusReasons";

type FocusResult = {
  id: number;
  reasons: number[];
};

type SimpleResult = {
  id: number;
  pokemonName: string;
};

type SearchResultsProps =
  | {
      focusMode: true;
      results: FocusResult[];
      onRemovePokemon: (id: number) => void;
      onFocusChange: (id: number, selected: number) => void;
    }
  | {
      focusMode: false;
      results: SimpleResult[];
      onRemovePokemon: (id: number) => void;
      onFocusChange?: never;
    };

export default function SearchResults(props: SearchResultsProps) {
  const { onRemovePokemon } = props;

  if (props.focusMode) {
    const { results, onFocusChange } = props;
    return (
      <FocusCardContainer>
        {results.map((focusEntry) => {
          const singlePokemon = pokemonList.find((p) => p.id === focusEntry.id);
          if (!singlePokemon) return null;

          return (
            <FocusCard key={singlePokemon.id}>
              <FocusCardHeader>
                <PokemonImageWrapper>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${singlePokemon.id}.png`}
                    alt={singlePokemon.pokemonName}
                    fill
                  />
                </PokemonImageWrapper>

                <strong>{singlePokemon.pokemonName}</strong>
                <RemoveButton
                  type="button"
                  onClick={() => onRemovePokemon(singlePokemon.id)}
                  aria-label={`"${singlePokemon.pokemonName}" entfernen`}
                >
                  <Remove width={20} height={20} />
                </RemoveButton>
              </FocusCardHeader>

              <FocusSelect
                onChange={(event) => {
                  const selected = Number(event.target.value);
                  if (selected) {
                    onFocusChange(singlePokemon.id, selected);
                  }
                }}
                value=""
              >
                <option value="">--- Wähle Gründe aus ---</option>
                {focusReasons
                  .filter((reason) => !focusEntry.reasons.includes(reason.id))
                  .map((reason) => (
                    <option key={reason.id} value={reason.id}>
                      {reason.textContent}
                    </option>
                  ))}
              </FocusSelect>

              {focusEntry.reasons.length > 0 && (
                <ReasonsList>
                  {focusEntry.reasons.map((reasonId) => {
                    const reason = focusReasons.find(
                      (reason) => reason.id === reasonId
                    );
                    if (!reason) return null;

                    return (
                      <ReasonItem key={reasonId}>
                        {reason.textContent}
                        <RemoveButton
                          type="button"
                          onClick={() =>
                            onFocusChange(singlePokemon.id, reasonId)
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
    );
  }

  const { results } = props;
  return (
    <FocusCardContainer>
      {results.map((entry) => {
        const singlePokemon = pokemonList.find(
          (pokemon) => pokemon.id === entry.id
        );
        if (!singlePokemon) return null;

        return (
          <FocusCard key={entry.id}>
            <FocusCardHeader>
              <PokemonImageWrapper>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`}
                  alt={singlePokemon.pokemonName}
                  fill
                />
              </PokemonImageWrapper>

              <strong>{singlePokemon.pokemonName}</strong>
              <RemoveButton
                type="button"
                onClick={() => onRemovePokemon(entry.id)}
                aria-label={`"${singlePokemon.pokemonName}" entfernen`}
              >
                <Remove width={20} height={20} />
              </RemoveButton>
            </FocusCardHeader>
          </FocusCard>
        );
      })}
    </FocusCardContainer>
  );
}
