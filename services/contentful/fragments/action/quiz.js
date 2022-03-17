import { gql } from 'graphql-request'

export const QuizFragment = gql`
  fragment QuizFragment on Quiz {
    question
    questionId
    inputType
    result {
      json
    }
    resultActionsCollection(limit: 5) {
      items {
        ...CallToActionFragment
      }
    }
    answersCollection(limit: 5) {
      items {
        ...QuizAnswerFragment
      }
    }
  }
`
