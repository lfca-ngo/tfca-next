import { gql } from 'graphql-request'

import { NavigationCollectionFragment } from '../fragments'

export const navigationCollectionQuery = gql`
  ${NavigationCollectionFragment}
  query ($locale: String, $preview: Boolean) {
    navigationCollection(locale: $locale, limit: 10, preview: $preview) {
      ...NavigationCollectionFragment
    }
  }
`
