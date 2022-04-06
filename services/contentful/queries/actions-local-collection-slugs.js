import { gql } from 'graphql-request'

export const actionsLocalCollectionSlugsQuery = gql`
  query {
    actionsLocalCollection(limit: 50) {
      items {
        layout
        slug
      }
    }
  }
`
