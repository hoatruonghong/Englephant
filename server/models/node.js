import mongoose from "mongoose";
const { Schema } = mongoose;

const NodeSchema = new Schema(
  {
    mapId: {
      type: mongoose.Types.ObjectId, 
      ref: 'map' ,
    },
    position: Number,
    type: String,
  },
);


export default mongoose.model("node", NodeSchema);
