import mongoose from "mongoose";
const { Schema } = mongoose;

const NodeSchema = new Schema(
  {
    mapId: {
      type: Number, 
      ref: 'map' ,
    },
    position: Number,
    type: String,
  },
);


export default mongoose.model("node", NodeSchema);
