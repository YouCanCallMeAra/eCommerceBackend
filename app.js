import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import genderRouter from "./src/routes/gender.routes.js";
import brandRouter from "./src/routes/brand.routes.js";
import mongoose from "mongoose";
import cors from "cors";

async function main() {
  dotenv.config("dotenv");

  //connect to db
  const url = process.env.DB_URL;
  await mongoose.connect(url);
  // console.log("db connected");

  const app = express();

  //parse the body.  not that interesting
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //setup routes
  app.use(cors());
  app.use(userRouter);
  app.use(authRouter);
  app.use(productRouter);
  app.use(categoryRouter);
  app.use(genderRouter);
  app.use(brandRouter);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log("listening to port " + port);
  });
}

main();
