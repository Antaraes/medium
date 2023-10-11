import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "./config/supabase";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let userDetail = {};
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signin";

  //   const { data: user } = await supabase.auth.getUser;
  //   console.log(user);
  // const token = localStorage.getItem("sb-fhlzckkowuelginwijoa-auth-token");
  const token = request.cookies.get("token");

  // if (!isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/signin", request.nextUrl));
  // }
  return NextResponse.redirect(new URL("/", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
