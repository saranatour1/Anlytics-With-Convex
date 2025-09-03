// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
    }

    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI; // must match the redirect URI used in authorization

    const response = await fetch("https://api.convex.dev/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        grant_type: "authorization_code",
        redirect_uri: redirectUri as string,
        code,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data: { access_token: string; token_type: string } = await response.json();
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set({
      name: "convex_access_token",
      value: data.access_token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
