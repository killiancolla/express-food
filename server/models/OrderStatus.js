import mongoose from 'mongoose';

const orderStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const OrderStatus = mongoose.model('order_status', orderStatusSchema);

export default OrderStatus;
