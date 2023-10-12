import Order from "../models/Order.js";
// import User from "../models/User.js";
// import OrderStatus from "../models/OrderStatus.js";
// import Food from "../models/Food.js";
// import Deliverer from "../models/Deliverers.js";
// import Status from "../models/Status.js";

export default {
  /**
   * Recupere la commande de l'utilisateur
   */
  getOrderByUserId: async (req, res) => {
    const { id } = req.params;

    try {
      const order = await Order.find({ customer: id });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

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
        return res.status(200).json({ error: "Bad code" });
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
      address,
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
      address: address,
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
        address: order.address,
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
    const data = req.body;

    try {
      const order = await Order.findById(id);
      order.delivers = data.delivers || order.delivers;
      order.status = data.status || order.status;
      order.order_end = data.order_end || order.order_end;

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
