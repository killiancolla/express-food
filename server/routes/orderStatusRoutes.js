import express from "express";
import OrderStatus from "../controller/orderStatusController.js";

const orderStatusRouter = express.Router();

orderStatusRouter.get("/", OrderStatus.getAllOrderStatus);
orderStatusRouter.get("/:id", OrderStatus.getOrderStatusById);
orderStatusRouter.post("/add", OrderStatus.addOrderStatus);
orderStatusRouter.patch("/:id", OrderStatus.updateOrderStatus);
orderStatusRouter.delete("/delete", OrderStatus.deleteOrderStatus);

export default orderStatusRouter;
