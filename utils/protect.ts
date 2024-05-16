import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { HydratedDocument } from "mongoose";

import getModels from "@/models";
import AppError from "./AppError";
import { UserSchemaDB } from "@/types";

const protect = async () => {
  const { User } = await getModels();
  let token = cookies().get("auth_token")?.value;

  if (!token) {
    throw new AppError("Please, invalid token", 403);
  }

  // Verify token
  const decoded = await new Promise<JwtPayload>(function (resolve) {
    return resolve(jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload);
  });

  // Check if user exists with refresh token
  const currentUser: HydratedDocument<UserSchemaDB> | null =
    await User.findById(decoded.id);

  if (!currentUser) {
    throw new AppError(
      "The user belonging to this token no longer exist.",
      403
    );
  }

  return currentUser;
};

export default protect;
