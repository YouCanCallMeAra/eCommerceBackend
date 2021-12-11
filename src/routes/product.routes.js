import { Router } from "express";
import ProductsModel from "../models/product.model.js";
import ProductValidate from "../validations/product.validate.js";

const productRouter = Router();

productRouter.get("/products", async (req, res) => {
  const product = await ProductsModel.find({});
  res.json(product);
});

productRouter.post("/products", async (req, res) => {
  try {
    await ProductValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(error.message);
  }

  const product = new ProductsModel(req.body);

  try {
    //save the inputs
    await product.save();
  } catch (error) {
    return res.status(500).json("Unknowen Error Happened!");
  }
  res.json({ message: "product created" });
});

productRouter.get("/products/:id", async (req, res) => {
  const product = await ProductsModel.findById(req.params.id);
  res.json(product);
});

productRouter.put("/products/:id", async (req, res) => {
  const product = await ProductsModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json(product);
});

productRouter.delete("/products/:id", async (req, res) => {
  await ProductsModel.findByIdAndRemove(req.params.id);
  res.json({ message: "product removed" });
});

export default productRouter;
