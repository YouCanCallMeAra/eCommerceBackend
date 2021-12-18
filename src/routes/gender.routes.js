import { Router } from "express";
import GenderModel from "../models/gender.model.js";
import genderValidate from "../validations/gender.validate.js";

const genderRouter = Router();

genderRouter.get("/genders", async (req, res) => {
  const brand = await GenderModel.find({});
  res.json(brand);
});

genderRouter.post("/genders", async (req, res) => {
  try {
    await genderValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error.message);
  }

  const gender = new GenderModel(req.body);

  try {
    await gender.save();
  } catch (error) {
    return res.status(500).json("Unknowen Error Happened!");
  }
  res.json({ message: "gender created" });
});

export default genderRouter;
