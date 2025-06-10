
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import {ADMIN_ROUTE, LOGIN_ROUTE
  ,ADMIN_DASHBOARD_ROUTE,
  ADMIN_MEETING_ROUTE, ADMIN_USER_ROUTE, 
  ADMIN_PARTICIPANT_ROUTE,
   LOGIN_USER_ROUTE,DASHBOARD_ROUTE } from "./constant"

export function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const Token = req.cookies.get('Token')?.value
    const userToken= req.cookies.get('userToken')?.value
   
    const isLoginPage = path === LOGIN_ROUTE.url;
const adminRoutes = [ADMIN_DASHBOARD_ROUTE.url, ADMIN_MEETING_ROUTE.url, ADMIN_USER_ROUTE.url, ADMIN_PARTICIPANT_ROUTE.url];
const isAdminDashboard = adminRoutes.some(route => path.startsWith(route));

  // admin field for authentication

    if ((isLoginPage ) && Token) {
        return NextResponse.redirect(new URL(ADMIN_DASHBOARD_ROUTE.url, req.url));
      }
      // Redirect users without token away from admin pages
      if ((isAdminDashboard) && !Token) {
        return NextResponse.redirect(new URL(LOGIN_ROUTE.url, req.url));
      }

      // user field for authentication
      if (path === DASHBOARD_ROUTE.url && !userToken) {
        return NextResponse.redirect(new URL(LOGIN_USER_ROUTE.url, req.url));
      }
      if (path === LOGIN_USER_ROUTE.url && userToken) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTE.url, req.url));
      }
   
    return NextResponse.next();
 
}
export const config = {
    matcher: [`${LOGIN_ROUTE.url}`,
      `${ADMIN_ROUTE.url},
      ${ADMIN_DASHBOARD_ROUTE.url},
      ${ADMIN_MEETING_ROUTE.url},
      ${ADMIN_USER_ROUTE.url}
      ,${ADMIN_PARTICIPANT_ROUTE.url}`,
      `${DASHBOARD_ROUTE.url}`,
      `${LOGIN_USER_ROUTE.url}`],
}