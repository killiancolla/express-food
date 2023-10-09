import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: Number,
    required: true,
  },
  delivers: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  products: {
    type: Object,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  order_start: {
    type: Date,
    required: true,
  },
  order_end: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
