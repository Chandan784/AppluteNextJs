// src/pages/api/verifyOtp/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Otp from "../../../../../model/Otp"; // Adjust the path if needed
import dbConnect from "../../../../../lib/dbConnect";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();
    console.log(email, otp);

    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP or OTP expired" },
        { status: 400 }
      );
    }

    const now = new Date();
    if (now > otpEntry.expiresAt) {
      return NextResponse.json(
        { success: false, message: "OTP has expired" },
        { status: 400 }
      );
    }

    // Optionally, remove OTP entry after successful verification
    // await Otp.deleteOne({ email, otp });

    return NextResponse.json(
      { success: true, message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
