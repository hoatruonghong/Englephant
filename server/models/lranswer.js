import mongoose from "mongoose";
const { Schema } = mongoose;

const LRAnswerSchema = new Schema(
  {
    content: {
        type: String,
    },
    isCorrect: {
        type: Boolean,
    },
    quizId: {
      type: mongoose.Types.ObjectId, 
      ref: 'quiz' ,
    }
  },
);


export default mongoose.model("lranswer", LRAnswerSchema);
