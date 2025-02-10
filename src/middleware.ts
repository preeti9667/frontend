
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import {ADMIN_ROUTE, LOGIN_ROUTE,ADMIN_DASHBOARD_ROUTE,ADMIN_MEETING_ROUTE, ADMIN_USER_ROUTE} from "./constant"

export function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const Token = req.cookies.get('Token')?.value
    const userToken= req.cookies.get('userToken')?.value
   
    const isLoginPage = path === LOGIN_ROUTE.url;
    const isAdminDashboard = path.startsWith(ADMIN_DASHBOARD_ROUTE.url);
    const isMeetingDashboard = path.startsWith(ADMIN_MEETING_ROUTE.url);
    const isUserDashboard = path.startsWith(ADMIN_USER_ROUTE.url); 

    if ((isLoginPage ) && Token) {
        return NextResponse.redirect(new URL(ADMIN_DASHBOARD_ROUTE.url, req.url));
      }
    
      // Redirect users without token away from admin pages
      if ((isAdminDashboard || isMeetingDashboard || isUserDashboard) && !Token) {
        return NextResponse.redirect(new URL(LOGIN_ROUTE.url, req.url));
      }
   
    return NextResponse.next();
 
}
export const config = {
    matcher: [`${LOGIN_ROUTE.url}`,`${ADMIN_ROUTE.url},${ADMIN_DASHBOARD_ROUTE.url},${ADMIN_MEETING_ROUTE.url},${ADMIN_USER_ROUTE.url}`],
}