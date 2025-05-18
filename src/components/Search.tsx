import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

type SearchProps =
  | ({
      focusMode: true;
      searchResults: { id: number; reasons: number[] }[];
      handleFocusChange: (id: number, selected: number) => void;
    } & CommonSearchProps)
  | ({
      focusMode: false;
      searchResults: { pokemonName: string; id: number }[];
      handleFocusChange?: never;
    } & CommonSearchProps);

type CommonSearchProps = {
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
  handleRemovePokemon: (id: number) => void;
};

export default function Search({
  title,
  searchTerm,
  handleChange,
  searchSuggestions,
  handlePokemonClick,
  searchResults,
  handleRemovePokemon,
  focusMode,
  handleFocusChange,
}: SearchProps) {
  return (
    <>
      <SearchBar
        title={title}
        searchTerm={searchTerm}
        onChange={handleChange}
        results={searchSuggestions}
        onPokemonClick={handlePokemonClick}
      />
      {focusMode ? (
        <SearchResults
          results={searchResults as { id: number; reasons: number[] }[]}
          onRemovePokemon={handleRemovePokemon}
          focusMode={true}
          onFocusChange={handleFocusChange!}
        />
      ) : (
        <SearchResults
          results={searchResults as { pokemonName: string; id: number }[]}
          onRemovePokemon={handleRemovePokemon}
          focusMode={false}
        />
      )}
    </>
  );
}
