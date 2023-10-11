import express from "express";
import Order from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", Order.getAllOrders);
orderRouter.get("/:id", Order.getOrderById);
orderRouter.get("/code/:id", Order.isCodeValid);
orderRouter.post("/", Order.createOrder);
orderRouter.patch("/:id", Order.updateOrder);
orderRouter.delete("/:id", Order.deleteOrder);

export default orderRouter;
