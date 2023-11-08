import mongoose from "mongoose";
const { Schema } = mongoose;

const PQuizSchema = new Schema(
  {
    question: String,
    video: String,
    type: {
        type: String,
        enum: ["IPA", "Nghe", "Phát âm"]
    },
    sound: {
        type: mongoose.Types.ObjectId, 
        ref: 'sound' ,
    }
  },
);


export default mongoose.model("pquiz", PQuizSchema);
