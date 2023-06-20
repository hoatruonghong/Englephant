import mongoose from "mongoose";
const { Schema } = mongoose;
import learner from "./learner.js";
import admin from "./admin.js";
import tutor from "./tutor.js";

const UserSchema = new Schema(
  {
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
    role: {
      type: Schema.Types.ObjectId,
      ref: "tutor" || "learner" || "admin",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("validate", function (next) {
  let hasProvider = false;
  if (
    (this.email && this.email.length > 0) ||
    (this.phone && this.phone.length > 0)
  ) {
    hasProvider = true;
  }
  return hasProvider ? next() : next(new Error("No Provider provided"));
});

export default mongoose.model("user", UserSchema);
