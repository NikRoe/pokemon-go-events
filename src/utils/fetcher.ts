// eslint-disable-next-line
export async function fetcher<T = any>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Daten");
  }
  return res.json();
}
