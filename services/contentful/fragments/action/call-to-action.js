import { gql } from 'graphql-request'

export const CallToActionFragment = gql`
  fragment CallToActionFragment on CallToAction {
    text
    type
    slug
    url
    block
    size
    icon {
      url
    }
    ghost
  }
`
