// src/collections/accounts.ts
import type { CollectionConfig } from 'payload'
import { withAccountCollection } from 'payload-auth-plugin/collection'
import { UsersTest } from './usersTest'

export const AccountsTest: CollectionConfig = withAccountCollection(
  {
    slug: 'accounts',
  },
  UsersTest.slug, 
)