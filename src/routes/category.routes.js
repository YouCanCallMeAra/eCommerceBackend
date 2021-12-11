import { Router } from "express";
import CategoriesModel from "../models/category.model.js";
import CategoryValidate from "../validations/category.validate.js";

const categoryRouter = Router();

categoryRouter.get("/categories", async (req, res) => {
  const category = await CategoriesModel.find({});
  res.json(category);
});

categoryRouter.post("/categories", async (req, res) => {
  try {
    await CategoryValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error.message);
  }

  const category = new CategoriesModel(req.body);

  try {
    await category.save();
  } catch (error) {
    return res.status(500).json("Unknowen Error Happened!");
  }
  res.json({ message: "category created" });
});

export default categoryRouter;
