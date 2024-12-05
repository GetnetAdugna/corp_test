// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from './utils/amplify-utils';

const publicRoutes: string[] = [
  '/contact_us',
  '/',
  '/pricing',
  '/privacy',
  '/products',
  '/terms',
  '/about',
  '/login',
  '/validate',
  '/auth/callback',
  '/oauth2/idpresponse',
  '/api/auth/session'
];

const protectedRoutes: string[] = ['/home'];
export async function middleware(request: NextRequest) {
  // const currentPath = request.nextUrl.pathname;
  // console.log('Middleware current path: ', currentPath);
  // const response = NextResponse.next();
  const url = request.nextUrl;
  const currentPath = url.pathname;
  const queryParams = url.searchParams;
  const response = NextResponse.next();

  if (currentPath === '/home' && queryParams.has('code') && queryParams.has('state')) {
    console.log('OAuth callback detected, allowing access.');
    return response;
  }

  if (publicRoutes.includes(currentPath)) {
    return response;
  }

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        console.log('Middleware Session: ', session.userSub);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  console.log('Middleware isAuthenticated: ', authenticated);

  if (authenticated && publicRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!authenticated && publicRoutes.includes(currentPath)) {
    return response;
  }

  if (!authenticated && protectedRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    ...publicRoutes,
    ...protectedRoutes,
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
