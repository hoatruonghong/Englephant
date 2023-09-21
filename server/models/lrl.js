import mongoose from "mongoose";
const { Schema } = mongoose;

const ListeningReadingLessonSchema = new Schema(
  {
    name: String,
    image: String,
    description: String,
    audio: String,
    price: Number,
    quizzes: [{
      quizId: {
        type: mongoose.Types.ObjectId, 
        ref: 'quiz' ,
      }
    }]
  }
);


export default mongoose.model("lrl", ListeningReadingLessonSchema);
