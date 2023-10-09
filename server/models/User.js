import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Number,
    required: true,
    default: 1,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
