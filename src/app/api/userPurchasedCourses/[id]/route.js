import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../model/User";
import Course from "../../../../../model/Course"; // Assuming you have a Course model

export async function GET(request, { params }) {
  const { id } = params; // Get the user ID from the URL parameters

  try {
    await dbConnect(); // Connect to the database

    // Find the user by ID and populate the purchasedCourses field
    const user = await User.findById(id).populate("purchasedCourses");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the purchased courses
    return NextResponse.json(
      { courses: user.purchasedCourses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
