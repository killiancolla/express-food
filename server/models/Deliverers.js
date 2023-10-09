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
    required: true
  },
  position: {
    type: Object
  }
});

const Deliverer = mongoose.model('Deliverer', delivererSchema);

export default Deliverer;
