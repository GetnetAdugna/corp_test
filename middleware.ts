import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from 'utils/utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const { authenticated, user } = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (context) => {
      try {
        const session = await fetchAuthSession(context, {});
        const authenticated = session.tokens !== undefined;
        const user = authenticated ? session : null;
        return { authenticated, user };
      } catch (err) {
        console.log(err);
        return { authenticated: false, user: null };
      }
    },
  });

  if (authenticated) {
    // You can access the user details here
    console.log('Logged-in user:', user);
    // You can also store the user details in the response headers or cookies
    // for later use in your application
    response.headers.set('x-auth-user', JSON.stringify(user));
    return response;
  }

  return NextResponse.redirect(new URL('/signup', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|signup).*)'],
};
