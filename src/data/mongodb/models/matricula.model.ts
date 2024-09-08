import mongoose, { Schema } from "mongoose";

const studentEnrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Function is required"],
  },
});

export const studentEnrollmentModel = mongoose.model(
  "studentEnrollment",
  studentEnrollmentSchema
);
