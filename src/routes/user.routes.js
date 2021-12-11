import { Router } from "express";
import UsersModel from "../models/user.model.js";
import userValidate from "../validations/user.validate.js";

const userRouter = Router();

userRouter.get("/users", async (req, res) => {
  const user = await UsersModel.find({});
  res.json(user);
});

userRouter.post("/users", async (req, res) => {
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

userRouter.get("/users/:id", async (req, res) => {
  const user = await UsersModel.findById(req.params.id);
  res.json(user);
});

userRouter.put("/users/:id", async (req, res) => {
  const user = await UsersModel.findByIdAndUpdate(req.params.id, req.body);
  res.json(user);
});

userRouter.delete("/users/:id", (req, res) => {
  UsersModel.findOneAndDelete(req.body).then((data) => res.send(data));
});

export default userRouter;
