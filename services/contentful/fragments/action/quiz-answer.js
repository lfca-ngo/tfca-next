import { gql } from 'graphql-request'

export const QuizAnswerFragment = gql`
  fragment QuizAnswerFragment on QuizAnswer {
    key
    value {
      json
    }
    icon {
      url
    }
    isCorrect
  }
`
