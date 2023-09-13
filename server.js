// importing dependencies
import { connectDB } from "./DB/index.js";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
// import userRouter from "./mentees/routes/user";
// load config
dotenv.config({ path: "./config/config.env" });
// connecting to DB
connectDB();
// initiating our app
const app = express();
// disabling cors issue
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// app data using jason stringify
app.use(express.json());
// using morgans in
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// listening to our app
app.listen();
// running the app on environment port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server is running " + process.env.NODE_ENV));
