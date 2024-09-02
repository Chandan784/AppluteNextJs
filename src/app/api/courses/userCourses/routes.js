import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import User from "@/models/User";

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  console.log(id); // Extract userId from the URL

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Fetch the user by ID and populate purchased courses
    const user = await User.findById(userId).populate("purchasedCourses");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the purchased courses
    return NextResponse.json({ purchasedCourses: user.purchasedCourses });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
