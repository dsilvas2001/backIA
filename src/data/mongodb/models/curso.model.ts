import mongoose, { Schema, mongo } from "mongoose";

const cursoSchema = new Schema({
  courseName: {
    type: String,
    required: [true, "Course is required"],
    unique: true,
  },
});

export const CourseModel = mongoose.model("course", cursoSchema);
