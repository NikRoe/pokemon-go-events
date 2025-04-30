import dbConnect from "@/db/dbConnect";
import Event from "@/db/models/Event";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const event = await Event.create(request.body);
      return response.status(201).json(event);
    } catch (error) {
      console.error("[POST /api/events] Fehler:", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Speichern des Events" });
    }
  }

  response.setHeader("Allow", ["POST"]);
  return response.status(405).end(`Methode ${request.method} nicht erlaubt`);
}
