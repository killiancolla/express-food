import express from "express";
import Order from "../controller/orderController.js";
import { isAuth, isAdmin } from "../auth/authentification.js";

const orderRouter = express.Router();

orderRouter.get("/", Order.getAllOrders);
orderRouter.get("/:id", Order.getOrderById);
orderRouter.post("/", Order.createOrder);
orderRouter.patch("/update/:id", isAuth, isAdmin, Order.updateOrder);
orderRouter.delete("/delete/:id", isAuth, isAdmin, Order.deleteOrder);

export default orderRouter;
