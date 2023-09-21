import mongoose from "mongoose";
const { Schema } = mongoose;

const PronunciationLessonSchema = new Schema(
  {
    name: String,
    image: String,
    sounds: [{
      soundId: {
        type: mongoose.Types.ObjectId, 
        ref: 'sound' ,
      }
    }]
  }
);


export default mongoose.model("pl", PronunciationLessonSchema);
