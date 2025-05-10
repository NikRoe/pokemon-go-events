export type EventPriority = 1 | 2 | 3 | 4 | 5;

export const priorityLevels: Record<number, string> = {
  1: "Unwichtig",
  2: "Wenig wichtig",
  3: "Neutral",
  4: "Wichtig",
  5: "Äußerst wichtig",
};

type PriorityConfig = {
  label: string;
  color: string; // z. B. HEX, CSS color name oder Theme-Key
};

export const priorityConfig: Record<EventPriority, PriorityConfig> = {
  1: { label: "Unwichtig", color: "#a0aec0" }, // grau
  2: { label: "Wenig wichtig", color: "#63b3ed" }, // blau
  3: { label: "Neutral", color: "#f6ad55" }, // orange
  4: { label: "Wichtig", color: "#ed8936" }, // dunkelorange
  5: { label: "Äußerst wichtig", color: "#e53e3e" }, // rot
};
