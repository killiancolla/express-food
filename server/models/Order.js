import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  delivers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'deliverers',
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderstatus',
    required: true,
  },
  products: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
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
    required: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
