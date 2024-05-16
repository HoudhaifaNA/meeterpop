import { promisify } from "node:util";

import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

import getModels from "@/models";
import AppError from "@/utils/AppError";
import Email from "@/utils/Email";
import withErrorHandler from "@/utils/withErrorHandler";
import protect from "@/utils/protect";

export const GET = withErrorHandler(async (_request: Request) => {
  const currentUser = await protect();

  return NextResponse.json(
    { message: "Logged In successfully", user: currentUser },
    { status: 200 }
  );
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { User } = await getModels();
  const { email } = await req.json();

  if (!email) {
    throw new AppError("Please, provide an email", 403);
  }

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });

  const token = await user.createAuthToken();
  const authLink = `${req.nextUrl.origin}/confirm/${token}`;
  await user.save({ validateBeforeSave: false });
  // await new Email(user, authLink).sendMagicLink();

  return NextResponse.json(
    { message: "Email has been sent to your email address", token },
    { status: 200 }
  );
});
