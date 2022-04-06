import { gql } from 'graphql-request'

export const pageLocalCollectionSlugsQuery = gql`
  query {
    pageLocalCollection(limit: 50) {
      items {
        slug
      }
    }
  }
`
