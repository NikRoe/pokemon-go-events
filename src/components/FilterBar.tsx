import { EventAndRaidFilter } from "@/types/filter";
import ResetIcon from "@/assets/icons/reset.svg";
import FilterButton from "./FilterButton";
import FlexContainer from "./FlexContainer";

interface FilterBarProps {
  activeFilter: EventAndRaidFilter;
  onFilterClick: (filter: EventAndRaidFilter) => void;
}

export default function FilterBar({
  activeFilter,
  onFilterClick,
}: FilterBarProps) {
  return (
    <FlexContainer>
      <FilterButton
        isActive={activeFilter === "active"}
        onClick={() => onFilterClick("active")}
      >
        Aktiv
      </FilterButton>
      <FilterButton
        isActive={activeFilter === "past"}
        onClick={() => onFilterClick("past")}
      >
        Abgelaufen
      </FilterButton>
      <FilterButton
        isActive={activeFilter === "upcoming"}
        onClick={() => onFilterClick("upcoming")}
      >
        Kommt bald
      </FilterButton>
      <FilterButton
        isActive={activeFilter === null}
        onClick={() => onFilterClick(null)}
      >
        <ResetIcon width={20} height={20} />
      </FilterButton>
    </FlexContainer>
  );
}
