import { pokemonList } from "@/data/pokemonList";
import {
  FormGroup,
  Input,
  Label,
  List,
  ListItem,
  PokemonImageWrapper,
} from "./Form.styled";
import Image from "next/image";

interface SearchBarProps {
  title: string;
  searchTerm: string;
  onChange: (event: string) => void;
  results: {
    name: string;
    url: string;
    pokemonName: string;
    id: number;
  }[];
  onPokemonClick: (clickedPokemon: { id: number; pokemonName: string }) => void;
}

export default function SearchBar({
  title,
  searchTerm,
  onChange,
  results,
  onPokemonClick,
}: SearchBarProps) {
  function updateMegaObject(id: number) {
    const name =
      pokemonList.find((pokemon) => pokemon.id === id)?.pokemonName ??
      "Unbekannt";
    return {
      id,
      pokemonName: name,
    };
  }

  return (
    <>
      {" "}
      <h3>{title}</h3>
      <FormGroup>
        <Label htmlFor="search">Pokémon suchen</Label>
        <Input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Name oder ID eingeben..."
        />
      </FormGroup>
      {searchTerm && (
        <List>
          {results.slice(0, 10).map((pokemon) => (
            <ListItem
              key={pokemon.id}
              onClick={() => {
                const updatedMega = updateMegaObject(pokemon.id);
                onPokemonClick(updatedMega);
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
    </>
  );
}
