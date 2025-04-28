import Head from "next/head";

const eventSpecials = [
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

const focusReasons = [
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

const events = [
  {
    id: 1,
    name: "Heranwachsen",
    startDay: "02.05.2025",
    startTime: "10:00",
    endDay: "07.05.2025",
    endTime: "20:00",
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

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokemon Go Events</title>
      </Head>
      <main>
        <h1>Pokemon Go Events Übersicht</h1>
        <ul>
          {events.map(
            ({
              id,
              name,
              startDay,
              startTime,
              endDay,
              endTime,
              preparation,
              specials,
              focus,
            }) => {
              return (
                <li key={id}>
                  <section>
                    <h2>{name}</h2>
                    <h3>Zeitraum</h3>
                    <p>
                      Vom {startDay} um {startTime} bis zum {endDay} um{" "}
                      {endTime}
                    </p>
                    <h3>Welche Vorbereitung braucht es?</h3>
                    <p>{preparation}</p>
                    <h3>Welche Besonderheiten hat dieses Event?</h3>
                    <ol>
                      {specials.map((specialId) => {
                        const foundSpecial = eventSpecials.find(
                          (special) => special.id === specialId
                        );
                        return (
                          <li key={foundSpecial?.id}>
                            {foundSpecial?.textContent}
                          </li>
                        );
                      })}
                    </ol>
                    <h3>
                      Auf welche Pokemon sollte ich wieso meinen Fokus legen?
                    </h3>
                    <ol>
                      {focus.map(({ pokemonName, reasons }) => {
                        return (
                          <li key={pokemonName}>
                            <h4>{pokemonName}</h4>
                            <ul>
                              {reasons.map((reasonId) => {
                                const foundReason = focusReasons.find(
                                  (reason) => reason.id === reasonId
                                );
                                return (
                                  <li key={reasonId}>
                                    {foundReason?.textContent}
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                </li>
              );
            }
          )}
        </ul>
      </main>
    </>
  );
}
