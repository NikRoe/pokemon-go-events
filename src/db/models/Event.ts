import mongoose from "mongoose";

export interface Events extends mongoose.Document {
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

const EventSchema = new mongoose.Schema<Events>({
  name: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  preparation: { type: Boolean },
  specials: [{ type: Number, required: true }],
  focus: [{ type: Object, required: true }],
});

export default mongoose.models.Event ||
  mongoose.model<Events>("Event", EventSchema);
