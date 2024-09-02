// pages/api/verify-payment.js

import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { paymentId, orderId, signature } = await req.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // Add your Razorpay key secret in environment variables
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature === signature) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
