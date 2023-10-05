import mongoose from "mongoose";
const { Schema } = mongoose;
// import learner from "./learner.js";
// import admin from "./admin.js";
// import tutor from "./tutor.js";
// import default from './../../mobile/src/components/Map1';
const UserSchema = new Schema(
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
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    bornYear: {
      type: Number,
    },
    gender: {
      type: String,
    },
    targetTime: {
      type: Number,
    },
    heart: {
      type: Number,
    },
    bud: {
      type: Number,
    },    
    peanut: {
      type: Number,
    },
    mode: {
      type: String,
      enum: ['Trẻ em','Thanh thiếu niên','Người lớn'],
      default: 'Trẻ em',
    },
  },
  { timestamps: true }
);

// UserSchema.pre("validate", function (next) {
//   let hasProvider = false;
//   if (
//     (this.email && this.email.length > 0) ||
//     (this.phone && this.phone.length > 0)
//   ) {
//     hasProvider = true;
//   }
//   return hasProvider ? next() : next(new Error("No Provider provided"));
// });

export default mongoose.model("user", UserSchema);
