import mongoose from "mongoose";
const { Schema } = mongoose;

const LearnerCardSchema = new Schema(
  {
    learnerId: {
        type: mongoose.Types.ObjectId, 
        ref: 'learner' ,
    },
    cardId: {
        type: mongoose.Types.ObjectId, 
        ref: 'card' ,
    },
    status: Number,
    correctNum: Number,
    incorrectNum: Number
  }
);


export default mongoose.model("learnercard", LearnerCardSchema);
