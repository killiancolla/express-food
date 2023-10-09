import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Status = mongoose.model('status', statusSchema);

export default Status;
