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

export const ActionFragment = gql`
  fragment ActionFragment on Action {
    name
    actionId
    carbonSaved
    timeToImplement
    dataCollection(limit: 3) {
      items {
        listId
        itemsCollection(limit: 10) {
          items {
            ... on DataWork {
              name
              description {
                json
              }
              tagsCollection(limit: 6) {
                items {
                  value {
                    json
                  }
                  key
                  icon {
                    url
                  }
                }
              }
            }
            ... on Input {
              key
              label
              valueNumber
              valueString
              type
              icon {
                url
              }
            }
          }
        }
      }
    }
    listsCollection(limit: 5) {
      items {
        listId
        itemsCollection(limit: 5) {
          items {
            ... on Block {
              key
              value {
                json
              }
            }
          }
        }
      }
    }
    blocksCollection(limit: 30) {
      items {
        ... on Block {
          key
          value {
            json
          }
        }
      }
    }
  }
`

export const AllActionsFragment = gql`
  ${ActionFragment}
  fragment AllActionsFragment on ActionsLocalCollection {
    items {
      regionCode
      actionsCollection(limit: 10) {
        items {
          ...ActionFragment
        }
      }
    }
  }
`

export const AllActionsDataFragment = gql`
  fragment AllActionsDataFragment on ActionsLocalCollection {
    items {
      actionsCollection(limit: 15) {
        items {
          ... on Action {
            dataCollection(limit: 50) {
              items {
                ... on Block {
                  key
                }
              }
            }
          }
        }
      }
    }
  }
`

export const AllActionsBlocksFragment = gql`
  fragment AllActionsBlocksFragment on ActionsLocalCollection {
    items {
      actionsCollection(limit: 15) {
        items {
          ... on Action {
            blocksCollection(limit: 50) {
              items {
                ... on Block {
                  key
                }
              }
            }
          }
        }
      }
    }
  }
`

export const MetaDataListsFragment = gql`
  fragment MetaDataListsFragment on Settings {
    listsCollection(limit: 20) {
      items {
        listId
        itemsCollection {
          items {
            ... on Block {
              key
              value {
                json
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
        icon {
          url
        }
        actionCollection {
          name
          slug
        }
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
        ... on Block {
          key
          value {
            json
          }
        }
      }
    }
  }
`
