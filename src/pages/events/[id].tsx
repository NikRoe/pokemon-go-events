import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { events } from "@/data/events";
import { eventSpecials } from "@/data/eventSpecials";
import { focusReasons } from "@/data/focusReasons";
import { Event } from "@/types/event";

interface EventDetailPageProps {
  event: Event | null;
}

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event nicht gefunden</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{event.name}</h1>
      <p>
        {new Date(event.start).toLocaleString("de-DE")} –{" "}
        {new Date(event.end).toLocaleString("de-DE")}
      </p>

      {event.preparation && (
        <section>
          <h2>Vorbereitung</h2>
          <p>{event.preparation}</p>
        </section>
      )}

      {event.specials.length > 0 && (
        <section>
          <h2>Specials</h2>
          <ul>
            {event.specials.map((specialId) => {
              const special = eventSpecials.find(
                (eventSpecial) => eventSpecial.id === specialId
              );
              return special ? (
                <li key={specialId}>{special.textContent}</li>
              ) : null;
            })}
          </ul>
        </section>
      )}

      {event.focus.length > 0 && (
        <section>
          <h2>Fokussierte Pokémon</h2>
          <ul>
            {event.focus.map((pokemon) => (
              <li key={pokemon.pokemonName}>
                <strong>{pokemon.pokemonName}</strong>
                <ul>
                  {pokemon.reasons.map((reasonId) => {
                    const reason = focusReasons.find(
                      (focusReason) => focusReason.id === reasonId
                    );
                    return reason ? (
                      <li key={reasonId}>{reason.textContent}</li>
                    ) : null;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = events.map((event) => ({
    params: { id: event.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  if (!id || Array.isArray(id)) {
    return { props: { event: null } };
  }

  const event = events.find((event) => event.id === parseInt(id, 10)) || null;

  return {
    props: { event },
    revalidate: 60,
  };
};
