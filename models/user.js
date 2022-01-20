import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the user is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email of the user is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Encrypted Password of the user is required"],
  },
});

userSchema.index({ email: 1 }, { unique: true });

mongoose.models = {};

const userModel = mongoose.model("userModel", userSchema, "userCollection");
export default userModel;
