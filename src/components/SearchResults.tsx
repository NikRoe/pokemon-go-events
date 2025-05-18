import { pokemonList } from "@/data/pokemonList";
import {
  FocusCard,
  FocusCardContainer,
  FocusCardHeader,
  PokemonImageWrapper,
  RemoveButton,
} from "./Form.styled";
import Image from "next/image";
import Remove from "@/assets/icons/remove.svg";

interface SearchResultsProps {
  results: {
    pokemonName: string;
    id: number;
  }[];
  onRemovePokemon: (id: number) => void;
}

export default function SearchResults({
  results,
  onRemovePokemon,
}: SearchResultsProps) {
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
                  fill={true}
                />
              </PokemonImageWrapper>

              <strong>{singlePokemon?.pokemonName}</strong>
              <RemoveButton
                type="button"
                onClick={() => {
                  onRemovePokemon(singlePokemon.id);
                }}
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
