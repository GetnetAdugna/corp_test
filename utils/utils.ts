import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth/server';
import config from '../amplify_outputs.json';
import { cookies } from 'next/headers';

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const getAuthUser = async () => {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (err) {
    return false;
  }
};

export const getFetchUserAttr = async () => {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec),
    });
    return currentUser;
  } catch (err) {
    return false;
  }
};

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch (error) {
        return false;
      }
    },
  });
