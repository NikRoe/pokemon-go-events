import dbConnect from "@/db/dbConnect";
import Raid from "@/db/models/Raid";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const raid = await Raid.create(request.body);
      return response.status(201).json(raid);
    } catch (error) {
      console.error("[POST /api/raids] Fehler:", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Speichern des Raids" });
    }
  }

  if (request.method === "GET") {
    try {
      const raids = await Raid.find().sort({ start: -1 });
      return response.status(200).json(raids);
    } catch (error) {
      console.error("[GET /api/raids] Fehler:", error);
      return response
        .status(500)
        .json({ error: "Fehler beim Laden der Raids" });
    }
  }

  response.setHeader("Allow", ["POST", "GET"]);
  return response.status(405).end(`Methode ${request.method} nicht erlaubt`);
}
