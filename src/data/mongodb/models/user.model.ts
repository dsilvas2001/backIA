import mongoose, { Schema, mongo } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  roles: {
    type: Schema.Types.ObjectId,
    ref: "rol",
    required: [true, "rol is required"],
  },
  status: {
    type: String,
    default: "Activo",
  },
});

export const UserModel = mongoose.model("user", userSchema);
