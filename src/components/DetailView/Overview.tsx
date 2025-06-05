import Link from "next/link";
import {
  Button,
  ButtonContainer,
  EventOverview,
  Heading,
  MegaRecommendation,
  PriorityBadge,
  Section,
  SubTitle,
  TimeInfo,
  Title,
  TitleRow,
} from "./DetailView.styled";
import Edit from "@/assets/icons/edit.svg";
import Delete from "@/assets/icons/delete.svg";
import { formatDateTimeWithWeekday } from "@/utils/formatDateTimeWithWeekday";
import { priorityLevels } from "@/data/priorityLevels";
import Image from "next/image";
import { PokemonImageWrapper } from "../Form.styled";
import { Event } from "@/types/event";

interface OverviewProps {
  event: Event;
  id: string;
  onClick: () => void;
  isForRaid?: boolean;
}

export default function Overview({
  event,
  id,
  onClick,
  isForRaid,
}: OverviewProps) {
  const { name, start, end, priority, preparation, recommendedMegas } = event;
  return (
    <EventOverview>
      <TitleRow>
        <Title>{name}</Title>
        <ButtonContainer>
          <Button
            as={Link}
            href={isForRaid ? `/raids/${id}/edit` : `/events/${id}/edit`}
            aria-label={isForRaid ? "Raid bearbeiten" : "Event bearbeiten"}
            size="64px"
          >
            <Edit />
          </Button>
          <Button
            onClick={onClick}
            type="button"
            aria-label={isForRaid ? "Raid löschen" : "Event löschen"}
            size="48px"
            $isDelete
          >
            <Delete />
          </Button>
        </ButtonContainer>
      </TitleRow>
      <TimeInfo>
        {formatDateTimeWithWeekday(start)} - {formatDateTimeWithWeekday(end)}
      </TimeInfo>

      <PriorityBadge $priority={priority || 1}>
        Priorität: {priorityLevels[priority || 1]} ({priority} / 5)
      </PriorityBadge>

      <Section>
        <SubTitle>Vorbereitung</SubTitle>
        <p>{preparation || "Keine"}</p>
      </Section>

      <strong>Empfohlene Mega-Entwicklung(en):</strong>
      {recommendedMegas.length > 0 ? (
        <MegaRecommendation>
          {recommendedMegas?.map((megaPokemon) => {
            return (
              <span key={megaPokemon.id}>
                {" "}
                <PokemonImageWrapper>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaPokemon.id}.png`}
                    alt={megaPokemon.pokemonName}
                    fill={true}
                  />
                </PokemonImageWrapper>
                <Heading>{megaPokemon.pokemonName}</Heading>
              </span>
            );
          })}
        </MegaRecommendation>
      ) : (
        <p>Keine</p>
      )}
    </EventOverview>
  );
}
