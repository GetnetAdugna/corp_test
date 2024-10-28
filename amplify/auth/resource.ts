import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email'],
      },
      callbackUrls: [
        'http://localhost:3000/home',
        'https://main.d271n3w4oqhh52.amplifyapp.com/home',
        'https://f0af1a3e6483968cbb0d.auth.ap-northeast-3.amazoncognito.com/home',
      ],
      logoutUrls: [
        'http://localhost:3000/login',
        'https://main.d271n3w4oqhh52.amplifyapp.com/login',
        'https://f0af1a3e6483968cbb0d.auth.ap-northeast-3.amazoncognito.com/login',
      ],
    },
  },
});
