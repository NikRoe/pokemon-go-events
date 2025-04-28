import { focusReasons } from "@/data/focusReasons";
import { Event } from "@/types/event";
import Image from "next/image";
import styled from "styled-components";

interface PokemonGridProps {
  event: Event;
}

const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

const FocusCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.3s ease;
`;

const PokemonImageWrapper = styled.figure`
  flex-shrink: 0;
  width: 128px;
  height: 128px;
  position: relative;
`;

const ReasonsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

export default function PokemonGrid({ event }: PokemonGridProps) {
  return (
    <FocusGrid>
      {event.focus.map((pokemon) => (
        <div key={pokemon.pokemonName}>
          <FocusCard>
            <PokemonImageWrapper>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.pokemonName}
                fill={true}
              />
              <figcaption style={{ textAlign: "center" }}>
                <h3>{pokemon.pokemonName}</h3>
              </figcaption>
            </PokemonImageWrapper>
            <div>
              <ReasonsList>
                {pokemon.reasons.map((reasonId) => {
                  const reason = focusReasons.find((r) => r.id === reasonId);
                  return reason ? (
                    <li key={reasonId}>{reason.textContent}</li>
                  ) : null;
                })}
              </ReasonsList>
            </div>
          </FocusCard>
        </div>
      ))}
    </FocusGrid>
  );
}
