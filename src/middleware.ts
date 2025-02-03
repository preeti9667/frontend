
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import {ADMIN_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE,HOME_ROUTE} from "./constant"

export function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname

    const publicRoutes = [HOME_ROUTE.url, LOGIN_ROUTE.url, SIGNUP_ROUTE.url];


    const Token = req.cookies.get('token')?.value
    
    if (!Token &&  !publicRoutes.includes(path)) {
        return NextResponse.redirect(new URL(HOME_ROUTE.url, req.url));
    }

    if (Token) {
        return NextResponse.redirect(new URL(ADMIN_ROUTE.url, req.url));
    }   


    return NextResponse.next();
 
}
export const config = {
    matcher: [`${LOGIN_ROUTE.url}`,`${SIGNUP_ROUTE.url}`,`${ADMIN_ROUTE.url},${HOME_ROUTE.url}`],
}