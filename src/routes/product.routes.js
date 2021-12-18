import { Router } from "express";
import ProductsModel from "../models/product.model.js";
import ProductValidate from "../validations/product.validate.js";
import winston from "winston";

const productRouter = Router();

productRouter.get("/products", async (req, res) => {
  // const product = await ProductsModel.find({});
  // res.json(product);
  // console.log(req.query.category);
  try {
    if (req.query.category) {
      // if category is specified in the query, then get all products of that category
      const products = await ProductsModel.find({
        category: req.query.category,
      });
      return res.json(products);
    } else if (req.query.brand) {
      // if category is specified in the query, then get all products of that category
      const products = await ProductsModel.find({
        brand: req.query.brand,
      });
      return res.json(products);
    } else if (req.query.gender) {
      // if category is specified in the query, then get all products of that category
      const products = await ProductsModel.find({
        gender: req.query.gender,
      });
      return res.json(products);
    } else if (req.query.search) {
      // if search is specified in the query, then get all products that match the search
      const products = await ProductsModel.find({
        name: { $regex: req.query.search, $options: "i" },
      });
      return res.json(products);
    } else {
      // if no query is specified, then get all products
      const products = await ProductsModel.find();
      return res.json(products);
    }
  } catch (error) {
    winston.error(error);
    return res.status(500).json({
      error: "fetching products failed!",
    });
  }
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
