import mongoose from "mongoose";
const { Schema } = mongoose;

const NodeSchema = new Schema(
  {
    position: {
        type: Number,
    },
    type: {
        type: String,
    }
  },
  { timestamps: true }
);


export default mongoose.model("node", NodeSchema);
