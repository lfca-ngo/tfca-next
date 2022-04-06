import { gql } from 'graphql-request'

import { ActionFragment } from '../fragments'

export const actionQuery = gql`
  ${ActionFragment}
  query (
    $locale: String
    $id: String!
    $dataLimit: Int
    $blocksLimit: Int
    $listsLimit: Int
    $quizLimit: Int
    $preview: Boolean
  ) {
    action(id: $id, locale: $locale, preview: $preview) {
      ...ActionFragment
    }
  }
`
