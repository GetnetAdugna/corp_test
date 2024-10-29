import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// const schema = a.schema({
//   UserImages: a
//     .model({
//       userId: a.string(),
//       uploadedUrl: a.string(),
//       generatedUrl: a.string(),
//     })
//     .authorization((allow) => [allow.owner()]),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: 'userPool',
//     apiKeyAuthorizationMode: {
//       expiresInDays: 30,
//     },
//   },
// });

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      key: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
