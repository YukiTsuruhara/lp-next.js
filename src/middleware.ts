import { NextRequest, NextResponse } from "next/server";

const BASIC_AUTH = "admin";
const BASIC_PASS = "admin";
const devRegix = /^https:\/\/[a-zA-Z0-9-]+\.lp-next-js\.pages\.dev\/$/;

export const config = {
  matcher: ["/:path*"],
};

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (!devRegix.test(req.url)) return;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (user === BASIC_AUTH && password === BASIC_PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized.", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
}
