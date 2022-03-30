import { gql } from 'graphql-request'

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
      body {
        json
      }
      acceptButton
      denyButton
      infoboxStats
      levelsCollection(limit: 5) {
        items {
          key
          value
        }
      }
    }
    topbar {
      active
      text
      mobileText
      link {
        title
        url
        slug
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
