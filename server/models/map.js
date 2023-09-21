import mongoose from "mongoose";
const { Schema } = mongoose;

const MapSchema = new Schema(
  {
    name: String,
    mode: Number,
    price: Number,
    image: String
  },
);


export default mongoose.model("map", MapSchema);
