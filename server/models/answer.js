import mongoose from "mongoose";
const { Schema } = mongoose;

const AnswerSchema = new Schema(
  {
    content: {
        type: String,
    },
    audio: {
        type: String,
    },
    image: {
        type: String,
    },
    isCorrect: {
        type: Boolean,
    }
  },
  { timestamps: true }
);


export default mongoose.model("answer", AnswerSchema);
