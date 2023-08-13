import mongoose from "mongoose";
const { Schema } = mongoose;

const PronunciationLessonSchema = new Schema(
  {
    name: {
        type: String,
    }
  },
  { timestamps: true }
);


export default mongoose.model("pronunciationLesson", PronunciationLessonSchema);
