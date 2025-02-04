
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import {ADMIN_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE,HOME_ROUTE} from "./constant"

export function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const Token = req.cookies.get('Token')?.value
    const TokenAdmin = req.cookies.get('TokenAdmin')?.value
   
    const isProtectedPath = path.startsWith(ADMIN_ROUTE.url);

    // if (!Token && isProtectedPath) {
    //     return NextResponse.redirect(new URL(LOGIN_ROUTE.url, req.url));
    // }

    // if (Token && path === HOME_ROUTE.url) {
    //     return NextResponse.redirect(new URL(ADMIN_ROUTE.url, req.url));
    // }
    // if(TokenAdmin && path === ADMIN_ROUTE.url){
    //     return NextResponse.redirect(new URL(SIGNUP_ROUTE.url, req.url));
    // }
    
    

   
    return NextResponse.next();
 
}
export const config = {
    matcher: [`${LOGIN_ROUTE.url}`,`${SIGNUP_ROUTE.url}`,`${ADMIN_ROUTE.url},${HOME_ROUTE.url}`],
}