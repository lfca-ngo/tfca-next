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

const DataWorkFragment = gql`
  fragment DataWorkFragment on DataWork {
    name
    icon {
      url
    }
    description {
      json
    }
    actionsCollection(limit: 5) {
      items {
        text
      }
    }
    levelsCollection(limit: 5) {
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
    tagsCollection(limit: 5) {
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
`

const DataOrganizationFragment = gql`
  fragment DataOrganizationFragment on DataOrganization {
    name
    tagsCollection(limit: 5) {
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
`

const DataBankFragment = gql`
  fragment DataBankFragment on DataBank {
    name
    typeCollection(limit: 5) {
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
`

const DataInputFragment = gql`
  fragment DataInputFragment on Input {
    key
    label
    type
    valueNumber
    valueString
    icon {
      url
    }
  }
`

const CallToActionFragment = gql`
  fragment CallToActionFragment on CallToAction {
    text
    type
    slug
    url
    size
    icon {
      url
    }
    ghost
  }
`

const QuizFragment = gql`
  ${CallToActionFragment}
  fragment QuizFragment on Quiz {
    question
    questionId
    result {
      json
    }
    resultActionsCollection(limit: 5) {
      items {
        ... on CallToAction {
          ...CallToActionFragment
        }
      }
    }
    answersCollection {
      items {
        key
        value {
          json
        }
        icon {
          url
        }
        isCorrect
      }
    }
  }
`

export const ActionFragment = gql`
  ${DataWorkFragment}
  ${DataOrganizationFragment}
  ${DataBankFragment}
  ${QuizFragment}
  ${DataInputFragment}
  fragment ActionFragment on Action {
    id
    name
    actionId
    carbonSaved
    timeToImplement
    icon {
      url
    }
    quizCollection(limit: $quizLimit) {
      items {
        ... on Quiz {
          ...QuizFragment
        }
      }
    }
    dataCollection(limit: $dataLimit) {
      items {
        listId
        filterableAttributes
        itemsCollection(limit: 5) {
          items {
            ... on DataOrganization {
              ...DataOrganizationFragment
            }
            ... on DataBank {
              ...DataBankFragment
            }
            ... on DataWork {
              ...DataWorkFragment
            }
            ... on Input {
              ...DataInputFragment
            }
          }
        }
      }
    }
    listsCollection(limit: $listsLimit) {
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
    blocksCollection(limit: $blocksLimit) {
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

export const QualifiedCompanyFragment = gql`
  fragment QualifiedCompanyFragment on QualifiedCompanyItem {
    company {
      id
      name
      micrositeSlug
    }
    completedCompanyActions {
      contentId
      description
      id
      requirements {
        contentId
        description
        id
        title
      }
      title
    }
  }
`
