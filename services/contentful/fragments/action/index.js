import { gql } from 'graphql-request'

import { BlockFragment } from '../block'
import { CallToActionFragment } from '../call-to-action'
import { QuizFragment } from './quiz'
import { QuizAnswerFragment } from './quiz-answer'

export const ActionFragment = gql`
  ${BlockFragment}
  ${CallToActionFragment}
  ${QuizFragment}
  ${QuizAnswerFragment}

  fragment ActionFragment on Action {
    id
    title
    name
    actionId
    carbonSaved
    impact
    impactDisclaimer {
      json
    }
    effort
    icon {
      url
    }
    imageInviteText
    imageInviteColor
    blocksCollection(limit: $blocksLimit) {
      items {
        ...BlockFragment
      }
    }
    listsCollection(limit: $listsLimit) {
      items {
        # __typename === List => Will be fetched separatly which is why we only need the ID here to map
        sys {
          id
        }
      }
    }
    dataCollection(limit: $dataLimit) {
      items {
        # __typename === List => Will be fetched separatly which is why we only need the ID here to map
        sys {
          id
        }
      }
    }

    quizCollection(limit: $quizLimit) {
      items {
        ...QuizFragment
      }
    }
  }
`
