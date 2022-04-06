import { gql } from 'graphql-request'

import { MetaDataListsFragment } from '../fragments'

export const settingsListsQuery = gql`
  ${MetaDataListsFragment}
  query ($locale: String, $settingsId: String!, $preview: Boolean) {
    settings(locale: $locale, id: $settingsId, preview: $preview) {
      ...MetaDataListsFragment
    }
  }
`
