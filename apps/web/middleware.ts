import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { cookies } from "next/headers";
 
const isSignInPage = createRouteMatcher(["/start",]);
const isProtectedRoute = createRouteMatcher(["/"]);
 
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const token = (await cookies()).get("convex_access_token")?.value
  if(!token && isProtectedRoute(request)){
    return nextjsMiddlewareRedirect(request, "/start");
  } else if(token && isSignInPage(request)){
    return nextjsMiddlewareRedirect(request, "/");
  }

  // // if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
  // // }
  // // if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
  // // }
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
matcher: [
  "/((?!api/auth/callback|.*\\..*|_next).*)",
  "/",
  // "/(api|trpc)(.*)",
]
};