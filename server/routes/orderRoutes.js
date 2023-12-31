import express from "express";
import Order from "../controller/orderController.js";
import { isAuth, isAdmin } from "../auth/authentification.js";

const orderRouter = express.Router();

orderRouter.get("/", Order.getAllOrders);
orderRouter.get("/:id", Order.getOrderById);
orderRouter.get("/user/:id", isAuth, Order.getOrderByUserId);
orderRouter.get("/deliverer/:id", isAuth, Order.getOrderByDeliverer);
orderRouter.post("/code/:id", isAuth, Order.isCodeValid);
orderRouter.post("/", Order.createOrder);
orderRouter.patch("/update/:id", isAuth, Order.updateOrder);
orderRouter.delete("/delete/:id", isAuth, isAdmin, Order.deleteOrder);

export default orderRouter;
