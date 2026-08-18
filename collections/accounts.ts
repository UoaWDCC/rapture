import type { CollectionConfig } from 'payload'
import { withAccountCollection } from 'payload-auth-plugin/collection'
import { Users } from './users.tsx'

export const Accounts: CollectionConfig = withAccountCollection(
  {
    slug: 'realaccounts',
  },
  Users.slug, 
)