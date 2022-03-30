import { gql } from 'graphql-request'

export const DataToolFragment = gql`
  fragment DataToolFragment on DataTool {
    name
    title
    tagline
    description {
      json
    }
    benefitsCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    actionsCollection {
      items {
        ...CallToActionFragment
      }
    }
    logo {
      url
    }
  }
`
