import styled from "styled-components";
import { EventFilter } from "@/types/filter";
import ResetIcon from "@/assets/icons/reset.svg";

interface FilterBarProps {
  activeFilter: EventFilter;
  onFilterClick: (filter: EventFilter) => void;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 1.5rem;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textPrimary : theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  svg {
    fill: currentColor;
  }
`;

export default function FilterBar({
  activeFilter,
  onFilterClick,
}: FilterBarProps) {
  return (
    <FilterContainer>
      <FilterButton
        $isActive={activeFilter === "active"}
        onClick={() => onFilterClick("active")}
      >
        Aktiv
      </FilterButton>
      <FilterButton
        $isActive={activeFilter === "past"}
        onClick={() => onFilterClick("past")}
      >
        Abgelaufen
      </FilterButton>
      <FilterButton
        $isActive={activeFilter === "upcoming"}
        onClick={() => onFilterClick("upcoming")}
      >
        Kommt bald
      </FilterButton>
      <FilterButton
        $isActive={activeFilter === null}
        onClick={() => onFilterClick(null)}
      >
        <ResetIcon width={20} height={20} />
      </FilterButton>
    </FilterContainer>
  );
}
