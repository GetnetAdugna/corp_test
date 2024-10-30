import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// const schema = a.schema({
//   UserImages: a
//     .model({
//       id: a.id().required(),
//       userId: a.string().required(),
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
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

// import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// const schema = a.schema({
//   Song: a
//     .model({
//       id: a.id().required(),
//       name: a.string().required(),
//       coverArtPath: a.string(),
//     })
//     .authorization((allow) => [allow.publicApiKey()]),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: 'apiKey',

//     apiKeyAuthorizationMode: {
//       expiresInDays: 30,
//     },
//   },
// });
