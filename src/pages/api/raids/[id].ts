import dbConnect from "@/db/dbConnect";
import Raid from "@/db/models/Raid";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const raid = await Raid.findById(id);

      if (!raid) {
        return response.status(404).json({ error: "Raid nicht gefunden" });
      }

      return response.status(200).json(raid);
    } catch (error) {
      console.error("[GET /api/raids/:id] Fehler:", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Laden des Raids" });
    }
  }

  if (request.method === "DELETE") {
    try {
      const deleted = await Raid.findByIdAndDelete(id);
      if (!deleted) {
        return response.status(404).json({ error: "Raid nicht gefunden" });
      }
      return response.status(204).end();
    } catch (error) {
      console.error("[DELETE /api/raids/:id]", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Löschen des Raids" });
    }
  }

  if (request.method === "PUT") {
    const updatedRaid = request.body;
    try {
      const raid = await Raid.findByIdAndUpdate(id, updatedRaid);
      if (!raid) {
        return response
          .status(404)
          .json({ error: "Raid konnte nicht aktualisiert werden" });
      }
      return response.status(200).json(raid);
    } catch (error) {
      console.error("[PUT /api/raids/:id] Fehler:", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Laden des Raids" });
    }
  }

  response.setHeader("Allow", ["GET", "DELETE", "PUT"]);
  return response.status(405).end(`Methode ${request.method} nicht erlaubt`);
}
