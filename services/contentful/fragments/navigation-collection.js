import { gql } from 'graphql-request'

export const NavigationCollectionFragment = gql`
  fragment NavigationCollectionFragment on NavigationCollection {
    items {
      title
      navigationId
      elementsCollection(limit: 20) {
        items {
          ... on Navigation {
            title
            navigationId
            elementsCollection(limit: 20) {
              items {
                ... on NavigationElement {
                  title
                  url
                  slug
                }
              }
            }
          }
          ... on NavigationElement {
            title
            url
            slug
          }
        }
      }
    }
  }
`
