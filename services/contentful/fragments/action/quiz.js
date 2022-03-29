import { gql } from 'graphql-request'

export const QuizFragment = gql`
  fragment QuizFragment on Quiz {
    question
    hint {
      json
    }
    questionId
    inputType
    wrongAnswerResponse
    rightAnswerResponse
    result {
      json
    }
    resultActionsCollection(limit: 5) {
      items {
        ...CallToActionFragment
      }
    }
    answersCollection(limit: 8) {
      items {
        ...QuizAnswerFragment
      }
    }
  }
`
