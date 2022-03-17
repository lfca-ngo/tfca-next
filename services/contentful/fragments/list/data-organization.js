import { gql } from 'graphql-request'

export const DataOrganizationFragment = gql`
  fragment DataOrganizationFragment on DataOrganization {
    name
    logo {
      url
    }
    actionsCollection {
      items {
        ...CallToActionFragment
      }
    }
    description {
      json
    }
    activitiesCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    tagsCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
  }
`
