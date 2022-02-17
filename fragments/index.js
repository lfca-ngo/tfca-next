import { gql } from 'graphql-request'

export const AllNavsFragment = gql`
  fragment AllNavsFragment on NavigationCollection {
    items {
      title
      navigationId
      elementsCollection(limit: 20) {
        items {
          ... on Navigation {
            title
            navigationId
            elementsCollection(limit: 20) {
              items {
                ... on NavigationElement {
                  title
                  url
                  slug
                }
              }
            }
          }
          ... on NavigationElement {
            title
            url
            slug
          }
        }
      }
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

export const MetaDataFragment = gql`
  fragment MetaDataFragment on Settings {
    settingsId
    socialsCollection(limit: 10) {
      items {
        title
        url
      }
    }
    regionsCollection(limit: 10) {
      items {
        name
        isoCode
        defaultLanguage {
          name
          isoCode
          icon {
            url
          }
        }
        languagesCollection(limit: 10) {
          items {
            name
            isoCode
            icon {
              url
            }
          }
        }
      }
    }
    cookieBanner {
      name
      title
      disclaimer
      acceptButton
      denyButton
      levelsCollection(limit: 5) {
        items {
          key
          value
        }
      }
    }
    resourcesCollection(limit: 100) {
      items {
        key
        value
      }
    }
  }
`
