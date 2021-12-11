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

categoryRouter.get("/categories/:id", async (req, res) => {
  const category = await CategoriesModel.findById(req.params.id);
  res.json(category);
});

categoryRouter.put("/categories/:id", async (req, res) => {
  const category = await CategoriesModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json(category);
});

categoryRouter.delete("/categories/:id", async (req, res) => {
  await CategoriesModel.findByIdAndRemove(req.params.id);
  res.json({ message: "category removed" });
});

export default categoryRouter;
