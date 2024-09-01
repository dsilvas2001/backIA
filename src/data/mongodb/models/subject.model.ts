import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    required: [true, "Course is required"],
  },
});

export const SubjectModel = mongoose.model("subject", subjectSchema);
