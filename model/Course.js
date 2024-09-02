// models/Course.js
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
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
