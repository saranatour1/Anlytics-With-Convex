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

const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
export function ConvexClientProvider({ children }: { children: ReactNode }) {  
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