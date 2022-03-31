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
    areasCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    needsCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    vettedByCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    location {
      lat
      lon
    }
    facebook
    instagram
    twitter
    website
  }
`
