import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import withErrorHandler from "@/utils/withErrorHandler";

export const dynamic = "force-dynamic";

export const GET = withErrorHandler(async (request: NextRequest) => {
  cookies().delete("auth_token");

  return NextResponse.redirect(request.nextUrl.origin);
});
