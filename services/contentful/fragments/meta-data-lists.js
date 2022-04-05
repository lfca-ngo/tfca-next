import { gql } from 'graphql-request'

export const MetaDataListsFragment = gql`
  fragment MetaDataListsFragment on Settings {
    listsCollection(limit: 20) {
      items {
        listId
        label
        itemsCollection {
          items {
            ... on Block {
              key
              value {
                json
              }
              icon {
                url
              }
            }
            ... on QuestionAndAnswer {
              question
              answer {
                json
              }
            }
          }
        }
      }
    }
  }
`
