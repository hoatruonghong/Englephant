import mongoose from "mongoose";
const { Schema } = mongoose;

const LearnerNodeSchema = new Schema(
  {
    learnerId: {
        type: mongoose.Types.ObjectId, 
        ref: 'learner' ,
    },
    nodeId: {
        type: mongoose.Types.ObjectId, 
        ref: 'node' ,
    },
    point: Number
  }
);


export default mongoose.model("learnernode", LearnerNodeSchema);