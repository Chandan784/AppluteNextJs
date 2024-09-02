// pages/api/users/updatePurchasedCourses.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../model/User";

// Assuming you have a utility function to connect to your database
export async function POST(req) {
  const { userId, courseId } = await req.json();
  console.log("user id", userId, "course id", courseId);

  try {
    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Add the course ID to the purchasedCourses array if it's not already there
    if (!user.purchasedCourses.includes(courseId)) {
      user.purchasedCourses.push(courseId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Course added successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update purchased courses" },
      { status: 500 }
    );
  }
}
