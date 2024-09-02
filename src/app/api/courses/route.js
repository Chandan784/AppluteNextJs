import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Course from "../../../../model/Course";

// GET all courses
export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST a new course
export async function POST(request) {
  const { title, description, price, thumbnail, content } =
    await request.json();

  try {
    await dbConnect();

    // Create a new course
    const newCourse = new Course({
      title,
      description,
      price,
      thumbnail,
      content,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    return NextResponse.json(savedCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// // Create a new course
// export async function POST(request) {
//   const { title, description, price, thumbnail, content } =
//     await request.json();
//   try {
//     await connectDB();
//     const newCourse = new Course({
//       title,
//       description,
//       price,
//       thumbnail,
//       content,
//     });
//     await newCourse.save();
//     return NextResponse.json(newCourse, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
