import mongoose from "mongoose";
const { Schema } = mongoose;

const LearnerMapSchema = new Schema(
  {
    learnerId: {
        type: mongoose.Types.ObjectId, 
        ref: 'learner' ,
    },
    mapId: {
        type: Number, 
        ref: 'map' ,
    },
    status: Number
  }
);


export default mongoose.model("learnermap", LearnerMapSchema);
