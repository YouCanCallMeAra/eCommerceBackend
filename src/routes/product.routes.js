import { Router } from "express";

const productRouter = Router();

productRouter.get("/products", (req, res) => {
  res.send("hello product");
});

export default productRouter;
