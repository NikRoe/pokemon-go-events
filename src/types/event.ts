export type EventPriority = 1 | 2 | 3 | 4 | 5;

export interface FrontendEvent {
  name: string;
  start: string;
  end: string;
  preparation: string | null;
  specials: number[];
  focus: {
    id: number;
    pokemonName: string;
    reasons: number[];
  }[];
  priority: EventPriority;
  steps: string[];
  recommendedMegas: { id: number; pokemonName: string }[];
}

export interface Event extends FrontendEvent {
  _id: string;
}

export interface Special {
  id: number;
  textContent: string;
}

export interface Reason {
  id: number;
  textContent: string;
}
