"use client";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { makeUseQueryWithStatus } from "convex-helpers/react";
import { useQueries } from "convex/react";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache";
// Do this once somewhere, name it whatever you want.
export const useQueryWithStatus = makeUseQueryWithStatus(useQueries);

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (<ConvexAuthNextjsProvider client={convex}>
    <ConvexQueryCacheProvider>
      {children}
    </ConvexQueryCacheProvider>
  </ConvexAuthNextjsProvider>)
}