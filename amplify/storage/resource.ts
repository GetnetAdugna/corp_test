import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'niche_ai',
  isDefault: true,
  access: (allow) => ({
    'media/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      // additional actions such as "write" and "delete" can be specified depending on your use case
    ],
    'uploaded_images/*': [
      allow.guest.to(['read', 'write']),
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    'generated_images/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.guest.to(['read']),
    ],
  }),
});
