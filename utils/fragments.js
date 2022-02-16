import { gql } from 'graphql-request'

export const AllNavsFragment = gql`
  fragment AllNavsFragment on NavigationCollection {
    items {
      title
    }
  }
`
