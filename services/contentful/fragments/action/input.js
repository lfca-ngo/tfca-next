import { gql } from 'graphql-request'

export const InputFragment = gql`
  fragment InputFragment on Input {
    key
    label
    type
    valueNumber
    valueString
    hasOptionalInput
    icon {
      url
    }
  }
`
