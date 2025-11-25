import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import { Task } from "./models/task.model.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/assign_task");
        console.log(`\n✅ MongoDB Connected || DB Host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection has been failed");
        process.exit(1);
    }
}


 
app.post("/create", async (req, res) => {
  try {
    const {username, useremail, userphone} = req.body
    
    if(!username || !useremail || !userphone){
        return res.status(402).json({error: "All fields  are required"})
    }
    
    const existingUser = await User.findOne({useremail})

    if(existingUser){
        return res.status(409).json({error: "user is alredy exist"})
    }

    const createUser = await User.create(
        {
            useremail,
            userphone,
            username
        }
    )
    return res.status(201).json({
      success: true,
      data: createUser,
      message: "User created successfully",
    });

  } catch (error) {
    console.error("Something went wrong with creation", error.message)
    return res.status(500).json({
      error: "Something went wrong with user creation",
      details: error.message,
    });
  }
});

app.post("/assign", async (req, res) => {
  try {
    const {assign_to, status} = req.body
    console.log(req.body)
    const user = await User.findOne({username: assign_to});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingTask = await Task.findOne({ assign_to: user._id });
    if (existingTask) {
      return res.status(400).json({ error: "No need to assigne any task" });
    }

    const assigneTask = await Task.create({assign_to: user._id, status : status})
    
    return res.status(200).json({
      success: true,
      data: assigneTask,
      message: "Task is assigned successfully",
    });
  } catch (error) {
    console.error("Something went wrong with creation", error.message);
    return res.status(500).json({
      error: "Something went wrong with task assigning creation",
      details: error.message,
    });
  }
});



app.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find({})
    return res.status(200).json({
      success: true, 
      data: tasks, 
      message: "all data retirieved successfully"})
  } catch (error) {
     return res.status(500).json({
       error: "Something went wrong with tasks retirvieing",
       details: error.message,
     });
  }
})

app.get("/task/:userId", async(req, res) => {
  try {
    const {userId} = req.params
    console.log(userId)
    const task = await Task.find({ assign_to: userId }).populate({
      path: "assign_to",
      match: { status: { $ne: "Block" } },
    });
    console.log(task)
    return res.status(201).json({success: true, data: task, message: "task deatail retriervied successfully"})
    
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong with task detail retrivering",
      details: error.message,
    });
  }
})




connectDb().then(() => app.listen(port, () => {
    console.log("⚙️  Server Running on Port : ", port);
}))