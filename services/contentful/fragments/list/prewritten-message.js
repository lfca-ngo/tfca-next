import { gql } from 'graphql-request'

export const PrewrittenMessageFragment = gql`
  fragment PrewrittenMessageFragment on PrewrittenMessage {
    name
    subject
    text
  }
`
