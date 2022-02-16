import { gql } from 'graphql-request'

export const AllNavsFragment = gql`
  fragment AllNavsFragment on NavigationCollection {
    items {
      title
    }
  }
`

export const ActionSwitchEnergyFragment = gql`
  fragment ActionSwitchEnergyFragment on ActionSwitchEnergy {
    name
    actionId
  }
`

export const AllActionsFragment = gql`
  ${ActionSwitchEnergyFragment}
  fragment AllActionsFragment on ActionsLocalCollection {
    items {
      regionCode
      actionsCollection(limit: 20) {
        items {
          ...ActionSwitchEnergyFragment
        }
      }
    }
  }
`
