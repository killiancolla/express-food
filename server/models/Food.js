import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    origins: { type: String, required: true },
    is_vegetarian: { type: Number, required: true },
    image: { type: String, required: true },
    is_dessert: { type: Number, required: true },
    price: { type: Number, required: true },
    flag: { type: Number, required: true },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;