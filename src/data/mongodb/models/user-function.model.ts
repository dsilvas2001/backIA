import mongoose, { Schema } from "mongoose";

const userFunctionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "rol",
    required: [true, "Rol is required"],
  },
  functionId: {
    type: Schema.Types.ObjectId,
    ref: "function",
    required: [true, "Function is required"],
  },
});

export const UserFunctionModel = mongoose.model(
  "userFunction",
  userFunctionSchema
);
