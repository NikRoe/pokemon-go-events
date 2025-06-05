export type EventPriority = 1 | 2 | 3 | 4 | 5;

export interface EventBasic {
  name: string;
  start: string;
  end: string;
  preparation: string | null;
  focus: {
    id: number;
    pokemonName: string;
    reasons: number[];
  }[];
  priority: EventPriority;
}

export interface EventBasicAndId extends EventBasic {
  _id: string;
}

export interface EventDetail extends EventBasic {
  specials: number[];
  steps: string[];
  recommendedMegas: { id: number; pokemonName: string }[];
}

export interface Event extends EventDetail {
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
