import express from "express";
import OrderStatus from "../controller/orderStatusController.js";
import { isAdmin, isAuth } from "../auth/authentification.js";

const orderStatusRouter = express.Router();

orderStatusRouter.get("/", OrderStatus.getAllOrderStatus);
orderStatusRouter.get("/:id", OrderStatus.getOrderStatusById);
orderStatusRouter.post("/add", isAuth, isAdmin, OrderStatus.addOrderStatus);
orderStatusRouter.patch("/:id", isAuth, isAdmin, OrderStatus.updateOrderStatus);
orderStatusRouter.delete("/delete", isAuth, isAdmin, OrderStatus.deleteOrderStatus);

export default orderStatusRouter;
