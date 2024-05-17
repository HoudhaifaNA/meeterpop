import crypto from "node:crypto";

import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

import getModels from "@/models";
import AppError from "@/utils/AppError";
import withErrorHandler from "@/utils/withErrorHandler";
import { UserSchemaDB } from "@/types";

interface Params {
  params: {
    token: string;
  };
}

const THREE_DAYS_IN_MILLISECONDS = 2.592e8;

const singToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (id: string) => {
  const token = singToken(id);

  cookies().set({
    name: "auth_token",
    value: token,
    maxAge: THREE_DAYS_IN_MILLISECONDS,
    httpOnly: true,
    path: "/",
  });
};

export const GET = withErrorHandler(
  async (req: NextRequest, { params }: Params) => {
    const { User } = await getModels();

    // 1 - GET TOKEN FROM URL AND HASH IT AND FIND USER BY TOKEN
    const { token } = params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user: HydratedDocument<UserSchemaDB> | null = await User.findOne({
      token: hashedToken,
      tokenExpires: { $gt: Date.now() },
    });

    // 2 - IF TOKEN IS INVALID OR EXPIRED THROW ERROR
    if (!user) {
      throw new AppError("Please, invalid token", 403);
    }

    user.tokenExpires = undefined;

    createAndSendToken(user.id);

    await user.save();

    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
  }
);
