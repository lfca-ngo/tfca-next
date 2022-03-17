import { gql } from 'graphql-request'

export const FilterFragment = gql`
  fragment FilterFragment on Filter {
    key
    label
    question
    renderAsStep
    filterMode
    hint {
      json
    }
  }
`
