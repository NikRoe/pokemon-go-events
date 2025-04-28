export const eventSpecials = [
  {
    id: 1,
    textContent: "Doppelte Erfahrung beim Entwickeln",
  },
  {
    id: 2,
    textContent: "Doppelte Bonbons beim Schlüpfen",
  },
  {
    id: 3,
    textContent: "Erhöhte Chance auf XXS- und XXL-Pokemon",
  },
];

export const focusReasons = [
  {
    id: 1,
    textContent: "Kann während des Events aus Eiern schlüpfen",
  },
  {
    id: 2,
    textContent: "PVE relevant",
  },
  {
    id: 3,
    textContent: "PVP relevant",
  },
  {
    id: 4,
    textContent: "Erscheint häufiger",
  },
  {
    id: 5,
    textContent: "Shiny Boost",
  },
  {
    id: 6,
    textContent: "Wichtig für Platin-Medaille",
  },
];

export const events = [
  {
    id: 1,
    name: "Heranwachsen",
    start: "2025-05-02T10:00:00",
    end: "2025-05-07T20:00:00",
    preparation: "Eier, aus denen nichts Spannendes schlüpfen kann ausbrüten.",
    specials: [1, 2, 3],
    focus: [
      {
        pokemonName: "Riolu",
        reasons: [1, 2],
      },
      {
        pokemonName: "Karpador",
        reasons: [4, 5, 2, 6],
      },
      {
        pokemonName: "Wablu",
        reasons: [4, 5],
      },
      {
        pokemonName: "Meikro",
        reasons: [4, 3],
      },
      {
        pokemonName: "Toxel",
        reasons: [1],
      },
    ],
  },
];
