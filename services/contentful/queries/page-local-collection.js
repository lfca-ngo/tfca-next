import { gql } from 'graphql-request'

export const pageLocalCollectionQuery = gql`
  query ($locale: String, $slug: String, $preview: Boolean) {
    pageLocalCollection(
      limit: 1
      locale: $locale
      where: { slug: $slug }
      preview: $preview
    ) {
      items {
        slug
        layout
        title
        style
        subtitle
        componentId
        body {
          json
          links {
            entries {
              inline {
                sys {
                  id
                }
                ... on NavigationElement {
                  title
                  action
                  __typename
                }
              }
            }
          }
        }
      }
    }
  }
`
