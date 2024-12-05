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
  '/login'
];
export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  console.log('Middleware current path: ', currentPath);
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        console.log('Middleware: ', session.userSub);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (authenticated && publicRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!authenticated && publicRoutes.includes(currentPath)) {
    return response;
  }

  if (authenticated) {
    return response;
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};
