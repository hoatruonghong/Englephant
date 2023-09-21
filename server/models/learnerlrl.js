import mongoose from "mongoose";
const { Schema } = mongoose;

const LearnerLRLSchema = new Schema(
  {
    learnerId: {
        type: mongoose.Types.ObjectId, 
        ref: 'learner' ,
    },
    lrlId: {
        type: mongoose.Types.ObjectId, 
        ref: 'lrl' ,
    },
    status: Number
  }
);


export default mongoose.model("learnerlrl", LearnerLRLSchema);
