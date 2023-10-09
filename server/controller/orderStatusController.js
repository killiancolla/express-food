import OrderStatus from "../models/OrderStatus.js";

export default {
  /**
   * Récupération de tous les statuts
   */
  getAllOrderStatus: async (req, res) => {
    try {
      const status = await OrderStatus.find();
      res.json(status);
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
      const status = await OrderStatus.findById(id);
      if (!status) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Ajout d'un statut à la liste
   */
  addOrderStatus: async (req, res) => {
    const newStatus = new Status({ name: req.body.name });
    try {
      const status = await newOrderStatus.save();
      res.send({
        _id: OrderStatus._id,
        status: OrderStatus.name
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
      const status = await OrderStatus.findById(id);
      OrderStatus.name = req.body.name || OrderStatus.name;
      const updatedStatus = await OrderStatus.save();
      if (!updatedStatus) {
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
      const deletedStatus = await OrderStatus.findByIdAndDelete(id);
      if (!deletedStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.json({ message: "Status deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
