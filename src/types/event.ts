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
