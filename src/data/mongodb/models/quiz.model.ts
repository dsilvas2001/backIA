import mongoose, { Schema, mongo } from "mongoose";

const quizSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject ID is required"],
  },
  docentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Docent ID is required"],
  },
});

export const QuizModel = mongoose.model("quiz", quizSchema);
