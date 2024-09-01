import mongoose, { Schema } from "mongoose";

const rolSchema = new Schema({
  rolName: {
    type: String,
    required: [true, "name is required"],
  },
});

export const RolModel = mongoose.model("rol", rolSchema);
