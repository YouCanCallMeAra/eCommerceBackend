import { Router } from "express";
import UsersModel from "../models/user.model.js";
import userValidate from "../validations/user.validate.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

// authRouter.get("/register", async (req, res) => {
//   const user = await UsersModel.find({});
//   res.json(user);
// });

authRouter.post("/register", async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error.message);
  }
  //get the inputs from body
  const user = new UsersModel(req.body);

  try {
    //save the inputs
    await user.save();
  } catch (error) {
    return res.status(500).json("Unknowen Error Happened!");
  }
  res.json({ message: "user created" });
});

authRouter.post("/login", async (req, res) => {
  //get the email and password from body
  const { email, password } = req.body;

  const user = await UsersModel.findOne({ email, password });

  //if user exists
  if (user) {
    //generate token
    const token = jwt.sign(JSON.stringify(user), process.env.JWT_PRIVATE_KEY);
    res.json({ token });
  } else {
    //show error
    res.status(400).json({ error: "inavlid authentication" });
  }
});
export default authRouter;
