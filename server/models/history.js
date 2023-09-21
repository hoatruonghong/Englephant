import mongoose from "mongoose";
const { Schema } = mongoose;

const HistorySchema = new Schema(
  {
    learningTime: Number
  },
  { timestamps: true }
);


export default mongoose.model("history", HistorySchema);
