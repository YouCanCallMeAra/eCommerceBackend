import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.routes.js";
import productRouter from "./src/routes/product.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import brandRouter from "./src/routes/brand.routes.js";
import mongoose from "mongoose";

async function main() {
  dotenv.config("dotenv");

  //connect to db
  const url = process.env.DB_URL;
  await mongoose.connect(url);
  console.log("db connected");

  const app = express();

  //parse the body.  not that interesting
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //setup routes
  app.use(userRouter);
  app.use(productRouter);
  app.use(categoryRouter);
  app.use(brandRouter);

  app.listen(process.env.PORT, () => {
    console.log("listening to port 5000");
  });
}

main();
