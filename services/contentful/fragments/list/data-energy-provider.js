import { gql } from 'graphql-request'

export const DataEnergyProviderFragment = gql`
  fragment DataEnergyProviderFragment on DataEnergyProvider {
    name
    logo {
      url
    }
    referralUrl
    description {
      json
    }
    currency
    benefitsCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
    regionCollection(limit: 5) {
      items {
        ...BlockFragment
      }
    }
  }
`
