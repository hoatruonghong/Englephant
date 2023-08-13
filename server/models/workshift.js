import mongoose from "mongoose";
const { Schema } = mongoose;

const WorkshiftSchema = new Schema(
  {
    date: {
        type: Date,
    },
    startTime: {
        type: Date,
    }
    endTime: {
        type: Date,
    }
  },
  { timestamps: true }
);


export default mongoose.model("workshift", WorkshiftSchema);
