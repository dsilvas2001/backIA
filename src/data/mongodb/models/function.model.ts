import mongoose, { Schema, mongo } from "mongoose";

const functionSchema = new Schema({
  functionName: {
    type: String,
    required: [true, "function is required"],
  },
});

export const FunctionModel = mongoose.model("function", functionSchema);
