import Deliverer from "../models/Deliverers.js";
import Status from "../models/Status.js";

export default {
  /**
   * Récupération de tous les livreurs
   */
  getAllDeliverers: async (req, res) => {
    try {
      const deliverers = await Deliverer.find();
      res.json(deliverers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération du livreur selon l'id passé dans l'url
   */
  getDelivererById: async (req, res) => {
    const { id } = req.params;
    try {
      const deliverer = await Deliverer.findById(id);
      if (!deliverer) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération du livreur selon l'id passé dans l'url
   */
  getDelivererByUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const deliverer = await Deliverer.find({ user_id: id });
      if (!deliverer) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(deliverer);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Ajout d'un livreur à la liste
   */
  addDeliverer: async (req, res) => {
    const newDeliverer = new Deliverer({ user_id: req.body.user_id, status: req.body.status });
    try {
      const existDeliverer = await Deliverer.find({ user_id: req.body.user_id });
      if (existDeliverer.length > 0) {
        return res.status(409).json({ error: "Deliverer already exists" });
      }
      const deliverer = await newDeliverer.save();
      res.send({
        _id: deliverer._id,
        user_id: deliverer.user_id,
        status: deliverer.status,
        position: deliverer.position
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Modification du status du livreur
   */
  updateDelivererStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const status = await Status.findById(req.body.status_id);
      if (status.length == 0) {
        return res.status(409).json({ error: "Status not found" });
      }
      const deliverer = await Deliverer.findById(id);
      deliverer.status = req.body.status_id || deliverer.status;
      const updatedDeliverer = await deliverer.save();
      if (!updatedDeliverer) {
        return res.status(404).json({ error: "Deliverer not found" });
      }
      res.send({
        _id: updatedDeliverer._id,
        user_id: updatedDeliverer.user_id,
        status: updatedDeliverer.status,
        position: updatedDeliverer.position
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Modification de la position du livreur
   */
  updateDelivererPosition: async (req, res) => {
    const { id } = req.params;
    try {
      const deliverer = await Deliverer.findById(id);
      deliverer.position = req.body.position || deliverer.position;
      const updatedDeliverer = await deliverer.save();
      if (!updatedDeliverer) {
        return res.status(404).json({ error: "Deliverer not found" });
      }
      res.send({
        _id: updatedDeliverer._id,
        user_id: updatedDeliverer.user_id,
        status: updatedDeliverer.status,
        position: updatedDeliverer.position
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression du livreur
   */
  deleteDeliverer: async (req, res) => {
    const id = req.body.id;
    try {
      const deletedDeliverer = await Deliverer.findByIdAndDelete(id);
      if (!deletedDeliverer) {
        return res.status(404).json({ error: "Deliverer not found" });
      }
      res.json({ message: "Deliverer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
