import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userphone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    useremail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);


export const User = mongoose.model("User", userSchema)