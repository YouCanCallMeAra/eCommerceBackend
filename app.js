import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.routes.js";

dotenv.config("dotenv");

const app = express();

//setup routes
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log("listening to port 5000");
});
