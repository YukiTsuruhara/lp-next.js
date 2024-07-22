import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"],
};

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  if (process.env.NEXT_PUBLIC_ENV === "prodction" || "local") return;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (
      user === process.env.NEXT_PUBLIC_BASIC_USER &&
      password === process.env.NEXT_PUBLIC_BASIC_PASS
    ) {
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
