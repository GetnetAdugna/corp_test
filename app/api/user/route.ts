import { getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from 'utils/utils';

export async function GET() {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });

  return NextResponse.json({ user });
}
