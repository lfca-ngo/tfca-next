import { gql } from 'graphql-request'

import { MetaDataFragment } from '../fragments'

export const settingsQuery = gql`
  ${MetaDataFragment}
  query ($locale: String, $settingsId: String!, $preview: Boolean) {
    settings(locale: $locale, id: $settingsId, preview: $preview) {
      ...MetaDataFragment
    }
  }
`
