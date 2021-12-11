import { Router } from "express";

const brandRouter = Router();

brandRouter.get("/brands", (req, res) => {
  res.send("hello brands");
});

export default brandRouter;
