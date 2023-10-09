import Order from "../models/Order.js";
import { generateToken } from "./../auth/authentification.js";
import bcrypt from "bcryptjs";

export default {
  /**
   * Création de l'utilisateur
   */
  createOder: async (req, res) => {
    const {
      customer,
      delivers,
      status,
      products,
      code,
      order_start,
      order_end,
    } = req.body.data;
    console.log(req.body);
    const newOrder = new Order({
      customer: customer,
      delivers: delivers,
      status: status,
      products: products,
      code: code,
      order_start: order_start,
      order_end: order_end,
    });
    console.log(newOrder);
    try {
      const order = await newOrder.save();
      res.send({
        _id: order._id,
        customer: order.customer,
        delivers: order.delivers,
        status: order.status,
        products: order.products,
        code: order.code,
        order_start: order.order_start,
        order_end: order.order_end,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
