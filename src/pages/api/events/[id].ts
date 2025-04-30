import dbConnect from "@/db/dbConnect";
import Event from "@/db/models/Event";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const event = await Event.findById(id);

      if (!event) {
        return response.status(404).json({ error: "Event nicht gefunden" });
      }

      return response.status(200).json(event);
    } catch (error) {
      console.error("[GET /api/events/:id] Fehler:", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Laden des Events" });
    }
  }

  response.setHeader("Allow", ["GET"]);
  return response.status(405).end(`Methode ${request.method} nicht erlaubt`);
}
