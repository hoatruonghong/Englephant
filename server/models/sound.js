import mongoose from "mongoose";
const { Schema } = mongoose;

const SoundSchema = new Schema(
  {
    name: String,
    audio: String,
    quizzes: [{
      quizId: {
        type: mongoose.Types.ObjectId, 
        ref: 'quiz' ,
      }
    }]
  }
);


export default mongoose.model("sound", SoundSchema);
