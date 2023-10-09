import Food from "../models/Food.js";
import { generateToken } from "./../auth/authentification.js";
import bcrypt from "bcryptjs";

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
                return res.status(404).json({ error: "User not found" });
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
        const { name, description, category,
            origins, is_vegetarian, image,
            is_dessert, price, flag } = req.body;
        const newFood = new Food({
            name: name,
            description: description,
            category: category,
            origins: origins,
            is_vegetarian: is_vegetarian,
            image: image,
            is_dessert: is_dessert,
            price: price,
            flag: flag
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
                flag: food.flag
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
        const { name, description, category, origins,
            is_vegetarian, image, is_dessert, price, flag } = req.body.data;

        try {
            const food = await Food.findById(id);
            user.name = name || user.name;
            user.description = description || user.description;
            user.category = category || user.category;
            user.origins = origins || user.origins;
            user.is_vegetarian = is_vegetarian || user.is_vegetarian;
            user.image = image || user.image;
            user.is_dessert = is_dessert || user.is_dessert;
            user.price = price || user.price;
            user.flag = flag || user.flag;

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
                flag: updatedFood.flag
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
            const food = await Food.findByIdAndDelete(id)
            user.flag = 0;

            const updatedUser = await user.save();
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

};