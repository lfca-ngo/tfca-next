import { gql } from 'graphql-request'

import { BlockFragment } from './block'
import { CallToActionFragment } from './call-to-action'
import { DataBankFragment } from './data-bank'
import { DataOrganizationFragment } from './data-organization'
import { DataPoliticalTopicFragment } from './data-political-topic'
import { DataWorkFragment } from './data-work'
import { FilterFragment } from './filter'
import { InputFragment } from './input'
import { PrewrittenMessageFragment } from './prewritten-message'
import { QuizFragment } from './quiz'
import { QuizAnswerFragment } from './quiz-answer'

export const ActionFragment = gql`
  ${BlockFragment}
  ${CallToActionFragment}
  ${DataBankFragment}
  ${DataOrganizationFragment}
  ${DataPoliticalTopicFragment}
  ${DataWorkFragment}
  ${FilterFragment}
  ${InputFragment}
  ${PrewrittenMessageFragment}
  ${QuizFragment}
  ${QuizAnswerFragment}

  fragment ActionFragment on Action {
    id
    name
    actionId
    carbonSaved
    impact
    effort
    icon {
      url
    }
    blocksCollection(limit: $blocksLimit) {
      items {
        ...BlockFragment
      }
    }
    listsCollection(limit: $listsLimit) {
      items {
        listId
        itemsCollection(limit: 5) {
          items {
            ...BlockFragment
          }
        }
      }
    }
    dataCollection(limit: $dataLimit) {
      items {
        listId
        cardLayout
        listGrid
        filtersCollection(limit: 3) {
          items {
            ...FilterFragment
          }
        }
        itemsCollection(limit: 15) {
          items {
            ...DataOrganizationFragment
            ...DataBankFragment
            ...DataWorkFragment
            ...InputFragment
            ...DataPoliticalTopicFragment
          }
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
