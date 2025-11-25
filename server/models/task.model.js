import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
  assign_to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  status: {
    type: String,
    enum: ["Assign", "UnAssign", "Block"],
    default: "UnAssigend",
  },
}, {timestamps:true});


export const Task = mongoose.model("Task", taskSchema);