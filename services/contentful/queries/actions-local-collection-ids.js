import { gql } from 'graphql-request'

export const actionsLocalCollectionIdsQuery = gql`
  query ($locale: String, $slug: String, $preview: Boolean) {
    actionsLocalCollection(
      limit: 1
      locale: $locale
      where: { slug: $slug }
      preview: $preview
    ) {
      items {
        layout
        openGraphInfo {
          ogtitle
          ogimage {
            url
          }
          ogdescription
        }
        actionsCollection(limit: 15) {
          items {
            ... on Action {
              sys {
                id
              }
              quizCollection(limit: 1) {
                total
              }
              blocksCollection(limit: 1) {
                total
              }
              dataCollection(limit: 1) {
                total
              }
              listsCollection(limit: 1) {
                total
              }
            }
          }
        }
      }
    }
  }
`
