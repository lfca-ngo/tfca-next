import { gql } from 'graphql-request'

export const DataWorkFragment = gql`
  fragment DataWorkFragment on DataWork {
    name
    icon {
      url
    }
    hero {
      url
    }
    description {
      json
    }
    shortDescription
    reasonsCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    actionsCollection(limit: 5) {
      items {
        ...CallToActionFragment
      }
    }
    levelsCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    areasCollection(limit: 5) {
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
