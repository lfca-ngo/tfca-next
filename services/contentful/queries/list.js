import { gql } from 'graphql-request'

import { ListFragment } from '../fragments'

export const listQuery = gql`
  ${ListFragment}
  query ($locale: String, $id: String!, $preview: Boolean) {
    list(id: $id, locale: $locale, preview: $preview) {
      ...ListFragment
    }
  }
`
