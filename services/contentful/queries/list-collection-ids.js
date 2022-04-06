import { gql } from 'graphql-request'

export const listCollectionIdsQuery = gql`
  query ($preview: Boolean) {
    listCollection(preview: $preview) {
      items {
        sys {
          id
        }
      }
    }
  }
`
