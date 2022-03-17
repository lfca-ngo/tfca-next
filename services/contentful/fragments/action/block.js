import { gql } from 'graphql-request'

export const BlockFragment = gql`
  fragment BlockFragment on Block {
    value {
      json
    }
    key
    icon {
      url
    }
  }
`
