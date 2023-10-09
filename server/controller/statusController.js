import Status from "../models/Status.js";

export default {
  /**
   * Récupération de tous les statuts
   */
  getAllStatus: async (req, res) => {
    try {
      const status = await Status.find();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération du statut selon l'id passé dans l'url
   */
  getStatusById: async (req, res) => {
    const { id } = req.params;
    try {
      const status = await Status.findById(id);
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
  addStatus: async (req, res) => {
    const newStatus = new Status({ name: req.body.name });
    try {
      const status = await newStatus.save();
      res.send({
        _id: status._id,
        status: status.name
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Modification du statut
   */
  updateStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const status = await Status.findById(id);
      status.name = req.body.name || status.name;
      const updatedStatus = await status.save();
      if (!updatedStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.send({
        _id: updatedStatus._id,
        name: updatedStatus.name
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression du statut
   */
  deleteStatus: async (req, res) => {
    const { id } = req.body.id;
    try {
      const deletedStatus = await Status.findByIdAndDelete(id);
      if (!deletedStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
      res.json({ message: "Status deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
