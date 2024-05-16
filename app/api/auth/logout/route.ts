import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import withErrorHandler from "@/utils/withErrorHandler";

export const POST = withErrorHandler(async (_request: Request) => {
  cookies().delete("auth_token");

  return NextResponse.json({ message: "success" }, { status: 200 });
});
