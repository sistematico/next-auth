import { NextResponse, type NextRequest } from "next/server";
import { getUserFromSession } from "@/lib/session";

export function middleware(request: NextRequest) {
  const user = getUserFromSession(request.cookies);

  if (
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname === "/dashboard") &&
    !user
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
