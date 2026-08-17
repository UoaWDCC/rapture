// src/collections/users.ts
import type { CollectionConfig } from 'payload'
import { withUsersCollection } from 'payload-auth-plugin/collection'

export const UsersTest: CollectionConfig = withUsersCollection({
  slug: 'usersTest',
  admin: {
    useAsTitle: 'email',
  },
})