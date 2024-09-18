import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    subscription: {
      type: String, // Values: '1-month', '6-month', '1-year' or null
      default: null,
      enum: ["1-month", "6-month", "1-year", null],
    },
    subscriptionExpiry: {
      type: Date, // Stores the expiry date of the subscription
      default: null, // Default to null for users who haven't subscribed yet
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Method to set subscription and calculate expiry date
userSchema.methods.setSubscription = function (plan) {
  const now = new Date();

  // Define durations in milliseconds
  const durations = {
    "1-month": 30 * 24 * 60 * 60 * 1000, // 30 days
    "6-month": 6 * 30 * 24 * 60 * 60 * 1000, // 6 months
    "1-year": 12 * 30 * 24 * 60 * 60 * 1000, // 12 months
  };

  if (!durations[plan]) {
    throw new Error("Invalid subscription plan");
  }

  // Set subscription details
  this.subscription = plan;
  this.subscriptionExpiry = new Date(now.getTime() + durations[plan]);
};

// Method to check if the user is currently subscribed
userSchema.methods.isSubscribed = function () {
  // If the subscriptionExpiry is null or the date is in the past, the user is not subscribed
  return this.subscriptionExpiry && new Date() < this.subscriptionExpiry;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
