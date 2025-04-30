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
}

const FocusSchema = new Schema(
  {
    id: { type: Number, required: true },
    pokemonName: { type: String, required: true },
    reasons: [{ type: Number, required: true }],
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
});

export default models.Event || model<EventDocument>("Event", EventSchema);
