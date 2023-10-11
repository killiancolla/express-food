import Order from "../models/Order.js";
import { generateToken } from "./../auth/authentification.js";
import bcrypt from "bcryptjs";

export default {
  /**
   * Récuperation de toutes les commandes
   */
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération d'une commande par son l'id
   */
  getOrderById: async (req, res) => {
    const { id } = req.params;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  isCodeValid: async (req, res) => {
    const { id } = req.params;
    const code = req.body.orderCode;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.code !== code) {
        return res.status(404).json({ error: "Bad code" });
      }
      return res.status(200).json({ success: "Good code" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Création du plat
   */
  createOrder: async (req, res) => {
    const {
      customer,
      delivers,
      status,
      price,
      products,
      code,
      order_start,
      order_end,
    } = req.body;
    const newOrder = new Order({
      customer: customer,
      delivers: delivers,
      status: status,
      price: price,
      products: products,
      code: code,
      order_start: order_start,
      order_end: order_end,
    });
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

  /**
   * Mise à jour d'un plat
   */
  updateOrder: async (req, res) => {
    const { id } = req.params;
    const {
      customer,
      delivers,
      status,
      products,
      code,
      order_start,
      order_end,
    } = req.body.data;

    try {
      const order = await Order.findById(id);
      order.customer = customer || order.customer;
      order.delivers = delivers || order.delivers;
      order.status = status || order.status;
      order.products = products || order.products;
      order.code = code || order.code;
      order.order_start = order_start || order.order_start;
      order.order_end = order_end || order.order_end;

      const updatedOrder = await order.save();
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.send({
        _id: updatedOrder._id,
        customer: updatedOrder.customer,
        delivers: updatedOrder.delivers,
        status: updatedOrder.status,
        products: updatedOrder.products,
        code: updatedOrder.code,
        order_start: updatedOrder.order_start,
        order_end: updatedOrder.order_end,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression de la commande selon son id
   */
  deleteOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteOrder = await Order.findByIdAndDelete(id);

      if (!deleteOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
