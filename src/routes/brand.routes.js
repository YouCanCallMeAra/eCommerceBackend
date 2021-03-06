import { Router } from "express";
import BrandsModel from "../models/brand.model.js";
import BrandValidate from "../validations/brand.validate.js";

const brandRouter = Router();

brandRouter.get("/brands", async (req, res) => {
  const brand = await BrandsModel.find({});
  res.json(brand);
});

brandRouter.post("/brands", async (req, res) => {
  try {
    await BrandValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error.message);
  }

  const brand = new BrandsModel(req.body);

  try {
    await brand.save();
  } catch (error) {
    return res.status(500).json("Unknowen Error Happened!");
  }
  res.json({ message: "brand created" });
});

brandRouter.get("/brands/:id", async (req, res) => {
  const brand = await BrandsModel.findById(req.params.id);
  res.json(brand);
});

brandRouter.put("/brands/:id", async (req, res) => {
  const brand = await BrandsModel.findByIdAndUpdate(req.params.id, req.body);
  res.json(brand);
});

brandRouter.delete("/brands/:id", async (req, res) => {
  await BrandsModel.findByIdAndRemove(req.params.id);
  res.json({ message: "brand removed" });
});

export default brandRouter;
