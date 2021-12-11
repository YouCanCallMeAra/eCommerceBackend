import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/categories", (req, res) => {
  res.send("hello category");
});

export default categoryRouter;
