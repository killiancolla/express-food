import OrderStatus from "../models/OrderStatus.js";

export default {
  /**
   * Récupération de tous les statuts
   */
  getAllOrderStatus: async (req, res) => {
    try {
      const orderStatus = await OrderStatus.find();
      res.json(orderStatus);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération du statut selon l'id passé dans l'url
   */
  getOrderStatusById: async (req, res) => {
    const { id } = req.params;
    try {
      const orderStatus = await OrderStatus.findById(id);
      if (!orderStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.json(orderStatus);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Ajout d'un statut à la liste
   */
  addOrderStatus: async (req, res) => {
    const newOrderStatus = new OrderStatus({ name: req.body.name });
    try {
      const orderStatus = await newOrderStatus.save();
      res.send({
        _id: orderStatus._id,
        status: orderStatus.name
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Modification du statut
   */
  updateOrderStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const orderStatus = await OrderStatus.findById(id);
      orderStatus.name = req.body.name || orderStatus.name;
      const updatedOrderStatus = await orderStatus.save();
      if (!updatedOrderStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.send({
        _id: updatedOrderStatus._id,
        name: updatedOrderStatus.name
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression du statut
   */
  deleteOrderStatus: async (req, res) => {
    const id = req.body.id;
    try {
      const deletedOrderStatus = await OrderStatus.findByIdAndDelete(id);
      if (!deletedOrderStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.json({ message: "Status deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
