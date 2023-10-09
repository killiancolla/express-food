import express from "express";
import OrderStatus from "../controller/orderStatusController.js";

const orderStatusRouter = express.Router();

orderStatusRouter.get("/", OrderStatus.getAllStatus);
orderStatusRouter.get("/:id", OrderStatus.getStatusById);
orderStatusRouter.post("/add", OrderStatus.addStatus);
orderStatusRouter.patch("/:id", OrderStatus.updateStatus);
orderStatusRouter.delete("/delete", OrderStatus.deleteStatus);

export default orderStatusRouter;
