import Food from "../models/Food.js";

export default {
  /**
   * Récuperation de tous les plats
   */
  getAllFood: async (req, res) => {
    try {
      const foods = await Food.find();
      res.json(foods);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération d'un plat par son l'id
   */
  getFoodById: async (req, res) => {
    const { id } = req.params;

    try {
      const food = await Food.findById(id);
      if (!food) {
        return res.status(404).json({ error: "Food not found" });
      }
      res.json(food);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Ajouter un plat
   */
  createFood: async (req, res) => {
    const {
      name,
      description,
      category,
      origins,
      is_vegetarian,
      image,
      is_dessert,
      price,
      flag,
    } = req.body;
    const newFood = new Food({
      name: name,
      description: description,
      category: category,
      origins: origins,
      is_vegetarian: is_vegetarian,
      image: image,
      is_dessert: is_dessert,
      price: price,
      flag: flag,
    });
    try {
      const food = await newFood.save();
      res.send({
        _id: food._id,
        name: food.name,
        description: food.description,
        category: food.category,
        origins: food.origins,
        is_vegetarian: food.is_vegetarian,
        image: food.image,
        is_dessert: food.is_dessert,
        price: food.price,
        flag: food.flag,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Mise à jour d'un plat
   */
  updateFood: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      origins,
      is_vegetarian,
      image,
      is_dessert,
      price,
      flag,
    } = req.body;

    try {
      const food = await Food.findById(id);
      food.name = name || food.name;
      food.description = description || food.description;
      food.category = category || food.category;
      food.origins = origins || food.origins;
      food.is_vegetarian = is_vegetarian || food.is_vegetarian;
      food.image = image || food.image;
      food.is_dessert = is_dessert || food.is_dessert;
      food.price = price || food.price;
      food.flag = flag || food.flag;

      const updatedFood = await food.save();
      if (!updatedFood) {
        return res.status(404).json({ error: "Food not found" });
      }

      res.send({
        _id: updatedFood._id,
        name: updatedFood.name,
        description: updatedFood.description,
        category: updatedFood.category,
        origins: updatedFood.origins,
        is_vegetarian: updatedFood.is_vegetarian,
        image: updatedFood.image,
        is_dessert: updatedFood.is_dessert,
        price: updatedFood.price,
        flag: updatedFood.flag,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression du plat selon son id
   */
  deleteFood: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedFood = await Food.findByIdAndDelete(id);

      if (!deletedFood) {
        return res.status(404).json({ error: "Food not found" });
      }
      res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
