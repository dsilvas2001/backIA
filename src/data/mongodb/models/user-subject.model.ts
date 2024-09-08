import mongoose, { Schema } from "mongoose";

const userSubjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required"],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    required: [true, "course is required"],
  },
}); //

export const userSubjectModel = mongoose.model("usercourse", userSubjectSchema);
