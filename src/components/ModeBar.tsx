import FilterButton from "./FilterButton";
import FlexContainer from "./FlexContainer";

interface ModeBarProps {
  mode: string;
  onModeClick: (mode: string) => void;
}

export default function ModeBar({ mode, onModeClick }: ModeBarProps) {
  return (
    <FlexContainer>
      <FilterButton
        isActive={mode === "event"}
        onClick={() => onModeClick("event")}
      >
        Events
      </FilterButton>
      <FilterButton
        isActive={mode === "raid"}
        onClick={() => onModeClick("raid")}
      >
        Raids
      </FilterButton>
    </FlexContainer>
  );
}
