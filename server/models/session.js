import mongoose from "mongoose";
const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    }
  },
  { timestamps: true }
);


export default mongoose.model("session", SessionSchema);
