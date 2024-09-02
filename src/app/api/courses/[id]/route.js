import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Course from "../../../../../model/Course";

// GET a course by ID
export async function GET(request) {
  // Extract the ID from the request URL
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  console.log(id);

  if (!id) {
    return NextResponse.json(
      { message: "ID parameter is missing" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
