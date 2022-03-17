import { gql } from 'graphql-request'

import { BlockFragment } from '../block'
import { CallToActionFragment } from '../call-to-action'
import { DataBankFragment } from './data-bank'
import { DataEnergyProviderFragment } from './data-energy-provider'
import { DataOrganizationFragment } from './data-organization'
import { DataPoliticalTopicFragment } from './data-political-topic'
import { DataWorkFragment } from './data-work'
import { FilterFragment } from './filter'
import { InputFragment } from './input'
import { PrewrittenMessageFragment } from './prewritten-message'

export const ListFragment = gql`
  ${BlockFragment}
  ${CallToActionFragment}
  ${DataBankFragment}
  ${DataEnergyProviderFragment}
  ${DataOrganizationFragment}
  ${DataPoliticalTopicFragment}
  ${DataWorkFragment}
  ${FilterFragment}
  ${InputFragment}
  ${PrewrittenMessageFragment}

  fragment ListFragment on List {
    sys {
      id
    }
    listId
    cardLayout
    listGrid
    filtersCollection(limit: 5) {
      items {
        ...FilterFragment
      }
    }
    itemsCollection(limit: 30) {
      items {
        ...BlockFragment
        ...DataBankFragment
        ...DataEnergyProviderFragment
        ...DataOrganizationFragment
        ...DataPoliticalTopicFragment
        ...DataWorkFragment
        ...FilterFragment
        ...InputFragment
      }
    }
  }
`
