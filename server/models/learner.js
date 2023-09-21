import mongoose from "mongoose";
const { Schema } = mongoose;

const LearnerSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String, trim: true, index: {
            unique: true,
            partialFilterExpression: {email: {$type: "String"}}
        }
    },
    phone: {
        type: String, trim: true, index: {
            unique: true,
            partialFilterExpression: {phone: {$type: "String"}}
        }
    },
    bornyear: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Nam", "Nữ", "Khác"],
    },
    heart: {
        type: Number,
        default: 0,
    },
    bud: {
        type: Number,
        default: 0,
    },
    peanut: {
        type: Number,
        default: 0,
    },
    defaultmode: {
        type: String,
        enum: ["Trẻ em", "Thanh thiếu niên", "Người lớn"],
    },
    targettime: {
        type: Number,
        require: true,
    },
    clothesId: {
        type: mongoose.Types.ObjectId, 
        ref: 'clothes' ,
    }
  },
);

LearnerSchema.pre("validate", function (next) {
  let hasProvider = false;
  if (
    (this.email && this.email.length > 0) ||
    (this.phone && this.phone.length > 0)
  ) {
    hasProvider = true;
  }
  return hasProvider ? next() : next(new Error("No Provider provided"));
});

export default mongoose.model("learner", LearnerSchema);