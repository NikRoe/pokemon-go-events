import { Schema, models, model } from "mongoose";
import { EventPriority } from "@/types/event";
import { FocusSchema, RecommendedMegasSchema } from "./Event";

interface RaidDocument extends Document {
  name: string;
  start: string;
  end: string;
  preparation: string | null;
  focus: {
    id: number;
    pokemonName: string;
    reasons: number[];
  }[];
  priority: EventPriority;
  recommendedMegas: { id: number; pokemonName: string }[];
}

const RaidSchema = new Schema<RaidDocument>({
  name: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  preparation: { type: String, default: null },
  focus: [FocusSchema],
  priority: { type: Number, required: true },
  recommendedMegas: [RecommendedMegasSchema],
});

export default models.Raid || model<RaidDocument>("Raid", RaidSchema);
