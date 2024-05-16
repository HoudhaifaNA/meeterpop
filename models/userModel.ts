import crypto from "node:crypto";

import { Schema, model, models } from "mongoose";
import validator from "validator";

import { UserSchemaDB } from "@/types";

const userSchema = new Schema<UserSchemaDB>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please, provide a valid email"],
      required: [true, "Please, provide a valid email"],
    },
    token: {
      type: String,
      select: false,
    },
    tokenExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.createAuthToken = function () {
  const authToken = crypto.randomBytes(32).toString("hex");
  this.token = crypto.createHash("sha256").update(authToken).digest("hex");
  this.tokenExpires = Date.now() + 10 * 60 * 1000;

  return authToken;
};
const User = models.User || model("User", userSchema);

export default User;
