import mongoose from "mongoose";
const { Schema } = mongoose;

const WorkshiftSchema = new Schema(
  {
    tutorId: {
      type: mongoose.Types.ObjectId, 
      ref: 'tutor' ,
    },
    date: String,
    startTime: String,
    endTime: String
  },
  { timestamps: true }
);


export default mongoose.model("workshift", WorkshiftSchema);
