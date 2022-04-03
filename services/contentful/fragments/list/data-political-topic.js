import { gql } from 'graphql-request'

export const DataPoliticalTopicFragment = gql`
  fragment DataPoliticalTopicFragment on DataPoliticalTopic {
    label
    description {
      json
    }
    messagesCollection(limit: 5) {
      items {
        ...PrewrittenMessageFragment
      }
    }
    delegationsCommittees
    icon {
      url
    }
  }
`
