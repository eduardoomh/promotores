import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {
  const jwt = request.cookies.get("chamosa_token");
  console.log(jwt)

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("chamosa_secret_key")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/pagos", "/promotores", "/usuarios", "/comisiones", "/configuracion" ],
};