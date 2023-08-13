import mongoose from "mongoose";
const { Schema } = mongoose;

const TutorSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    nationality: {
        type: String,
    },
    introduction: {
        type: String,
    },
    avatar: {
        type: String,
    }
  },
  { timestamps: true }
);


export default mongoose.model("tutor", TutorSchema);
