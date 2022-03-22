import { gql } from 'graphql-request'

export const DataBankFragment = gql`
  fragment DataBankFragment on DataBank {
    name
    logo {
      url
    }
    referralUrl
    description {
      json
    }
    pricePerMonth
    currency
    offersCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    sustainabilityCollection(limit: 8) {
      items {
        ...BlockFragment
      }
    }
    benefitsCollection(limit: 8) {
      items {
        ...BlockFragment
      }
    }
    typeCollection(limit: 5) {
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
