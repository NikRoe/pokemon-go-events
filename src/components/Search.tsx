import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

interface SearchProps {
  title: string;
  searchTerm: string;
  handleChange: (event: string) => void;
  searchSuggestions: {
    name: string;
    url: string;
    pokemonName: string;
    id: number;
  }[];
  handlePokemonClick: (clickedPokemon: {
    id: number;
    pokemonName: string;
  }) => void;
  searchResults: {
    pokemonName: string;
    id: number;
  }[];
  handleRemovePokemon: (id: number) => void;
}

export default function Search({
  searchTerm,
  handleChange,
  searchSuggestions,
  handlePokemonClick,
  searchResults,
  handleRemovePokemon,
}: SearchProps) {
  return (
    <>
      <SearchBar
        title="Empfohlene Mega-Entwicklungen"
        searchTerm={searchTerm}
        onChange={handleChange}
        results={searchSuggestions}
        onPokemonClick={handlePokemonClick}
      />

      <SearchResults
        results={searchResults}
        onRemovePokemon={handleRemovePokemon}
      />
    </>
  );
}
