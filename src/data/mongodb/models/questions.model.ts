import mongoose, { Schema, mongo } from "mongoose";

const questionsSchema: Schema = new Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required"],
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: [true, "Quiz ID is required"],
  },
});

export const QuestionModel = mongoose.model("questions", questionsSchema);
