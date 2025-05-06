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
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: background-color 0.5s ease;
`;

const PokemonImageWrapper = styled.div`
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

const PokemonInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Heading = styled.h3`
  border-bottom: 2px solid ${({ theme }) => theme.colors.shadow};
  text-align: center;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
`;

export default function PokemonGrid({ event }: PokemonGridProps) {
  return (
    <FocusGrid>
      {event.focus.map((pokemon) => (
        <FocusCard key={pokemon.pokemonName}>
          <PokemonImageWrapper>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.pokemonName}
              fill={true}
            />
          </PokemonImageWrapper>
          <PokemonInfoContainer>
            <Heading>{pokemon.pokemonName}</Heading>
            <ReasonsList>
              {pokemon.reasons.map((reasonId) => {
                const reason = focusReasons.find((r) => r.id === reasonId);
                return reason ? (
                  <li key={reasonId}>{reason.textContent}</li>
                ) : null;
              })}
            </ReasonsList>
          </PokemonInfoContainer>
        </FocusCard>
      ))}
    </FocusGrid>
  );
}
