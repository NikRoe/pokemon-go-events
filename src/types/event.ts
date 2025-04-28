export interface Event {
  id: number;
  name: string;
  start: string; // ISO-Zeitstempel
  end: string; // ISO-Zeitstempel
  preparation?: string;
  specials: number[]; // IDs aus eventSpecials
  focus: {
    pokemonName: string;
    reasons: number[]; // IDs aus focusReasons
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
