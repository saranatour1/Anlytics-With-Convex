"use client";
import { ConvexReactClient } from "convex/react";
import { ReactNode, use, useEffect } from "react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { makeUseQueryWithStatus } from "convex-helpers/react";
import { useQueries } from "convex/react";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache";
import { ThemeProvider } from "next-themes";
import { CLIENT_ID, REDIRECT_URI } from "./LoginForm";
// Do this once somewhere, name it whatever you want.
export const useQueryWithStatus = makeUseQueryWithStatus(useQueries);

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const CLIENT_SECRET = process.env.CLIENT_SECRET;
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // const authorizeConvex = async () => {
  //   const response = await fetch("https://api.convex.dev/oauth/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams({
  //       client_id: CLIENT_ID as string,
  //       client_secret: CLIENT_SECRET as string,
  //       grant_type: "authorization_code",
  //       redirect_uri: REDIRECT_URI as string,
  //       code: "code",
  //     }),
  //   });

  //   if (!response.ok) {
  //     console.error("Token exchange failed:", await response.text());
  //     throw new Error("Failed to exchange authorization code for token");
  //   }

  //   const { access_token } = await response.json();
  //   convex.setAuth(access_token);

  //   // Use access_token securely
  //   return access_token
  // }
  // // Use useEffect to handle async authorization
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const f = await authorizeConvex();
  //       console.log(f)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchToken();
  // }, []);
  
  return (<ConvexAuthNextjsProvider client={convex}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexQueryCacheProvider>
        {children}
      </ConvexQueryCacheProvider>
    </ThemeProvider>
  </ConvexAuthNextjsProvider>)
}