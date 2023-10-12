import mongoose from 'mongoose';

const delivererSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
    default: "6523f32a1cfc63a841e7369a",
    required: true
  }
});

const Deliverer = mongoose.model('Deliverer', delivererSchema);

export default Deliverer;
