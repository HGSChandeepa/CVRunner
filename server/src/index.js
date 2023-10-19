import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/users.js";
import { CvDataRouter } from "./routes/cvdata.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json()); //this will allow us to send data in json format
app.use(cors()); //this will allow us to send data from frontend to backend

app.use("/auth", UserRouter);
app.use("/cvdata", CvDataRouter);

//connetc to mongodb
mongoose.connect(
  "mongodb+srv://saminchandeepa:samin123@cvapp.dra5wjg.mongodb.net/cvapp?retryWrites=true&w=majority"
);

app.listen(5000, () => {
  console.log("SERVER STARTED");
});
