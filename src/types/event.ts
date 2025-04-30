export interface Event {
  _id: string;
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

export interface Special {
  id: number;
  textContent: string;
}

export interface Reason {
  id: number;
  textContent: string;
}
