import mongoose from "mongoose";
const { Schema } = mongoose;

const QuizSchema = new Schema(
  {
    image: String,
    question: String,
    video: String,
    audio: String,
    type: String,
  },
);


export default mongoose.model("quiz", QuizSchema);
