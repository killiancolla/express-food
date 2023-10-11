import express from "express";
import Food from "../controller/foodController.js";
import { isAuth, isAdmin } from "../auth/authentification.js";

const foodRouter = express.Router();

foodRouter.get("/", Food.getAllFood);
foodRouter.get("/:id", Food.getFoodById);
foodRouter.post("/", Food.createFood);
foodRouter.patch("/update/:id", isAuth, isAdmin, Food.updateFood);
foodRouter.delete("/delete/:id", isAuth, isAdmin, Food.deleteFood);

export default foodRouter;
