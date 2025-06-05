import { EventPriority } from "@/types/event";
import { Schema, Document, models, model } from "mongoose";

export interface EventDocument extends Document {
  name: string;
  start: string;
  end: string;
  preparation: string | null;
  specials: number[];
  focus: {
    id: number;
    pokemonName: string;
    reasons: number[];
  }[];
  priority: EventPriority;
  steps: string[];
  recommendedMegas: { id: number; pokemonName: string }[];
}

export const FocusSchema = new Schema(
  {
    id: { type: Number, required: true },
    pokemonName: { type: String, required: true },
    reasons: [{ type: Number, required: true }],
  },
  { _id: false }
);

export const RecommendedMegasSchema = new Schema(
  {
    id: { type: Number, required: true },
    pokemonName: { type: String, required: true },
  },
  { _id: false }
);

const EventSchema = new Schema<EventDocument>({
  name: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  preparation: { type: String, default: null },
  specials: [{ type: Number, required: true }],
  focus: [FocusSchema],
  priority: { type: Number, required: true },
  steps: [{ type: String, required: true }],
  recommendedMegas: [RecommendedMegasSchema],
});

export default models.Event || model<EventDocument>("Event", EventSchema);
