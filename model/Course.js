import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  content: [
    {
      topicTitle: {
        type: String,
        required: true,
      },
      topicUrl: {
        type: String,
        required: true,
      },
    },
  ],
  notes: [
    {
      notesTitle: {
        type: String,
        required: true,
      },
      notesLink: {
        type: String,
        required: true,
      },
    },
  ],
  tests: [
    {
      testTitle: {
        type: String,
        required: true,
      },
      testId: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
