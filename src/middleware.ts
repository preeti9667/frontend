
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import {ADMIN_ROUTE, LOGIN_ROUTE,ADMIN_DASHBOARD_ROUTE,ADMIN_MEETING_ROUTE, ADMIN_USER_ROUTE} from "./constant"

export function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const Token = req.cookies.get('Token')?.value
    const userToken= req.cookies.get('userToken')?.value
   
    const isLoginPage = path === LOGIN_ROUTE.url;
const adminRoutes = [ADMIN_DASHBOARD_ROUTE.url, ADMIN_MEETING_ROUTE.url, ADMIN_USER_ROUTE.url];
const isAdminDashboard = adminRoutes.some(route => path.startsWith(route));

    if ((isLoginPage ) && Token) {
        return NextResponse.redirect(new URL(ADMIN_DASHBOARD_ROUTE.url, req.url));
      }
    
      // Redirect users without token away from admin pages
      if ((isAdminDashboard) && !Token) {
        return NextResponse.redirect(new URL(LOGIN_ROUTE.url, req.url));
      }
   
    return NextResponse.next();
 
}
export const config = {
    matcher: [`${LOGIN_ROUTE.url}`,`${ADMIN_ROUTE.url},${ADMIN_DASHBOARD_ROUTE.url},${ADMIN_MEETING_ROUTE.url},${ADMIN_USER_ROUTE.url}`],
}