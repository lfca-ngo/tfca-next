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

// Switch for the Climate Api
export const SwitchRateFragment = gql`
  fragment SwitchRateFragment on SwitchRate {
    affiliateLink
    id
    name
    slug
    foreignId
    ranking
    description
    energyDescription
    price {
      basePrice
      workingPrice
    }
    emissions {
      type
      value
    }
    labels {
      slug
      name
      description
      authority
      authorityLink
      labelOnlineLink
      image {
        url
        width
        height
      }
      thumbnail {
        url
        width
        height
      }
    }
    advantages
    minimumTerm {
      unit
      value
    }
    extendedTerm {
      unit
      value
    }
    cancellationPeriod {
      unit
      value
    }
    priceGuarantee {
      date
      period {
        unit
        value
      }
    }
    energyMix {
      source
      percent
    }
    energyMixYear
    provider {
      id
      name
      slug
      tagline
      legalName
      about
      website
      logo {
        url
        width
        height
      }
      robinWoodRating {
        companyName
        criteriaId
        reason
        note
        teaser
        text
        link
        recommendation
      }
      robinWoodRecommendation {
        contribution
        energySources
        entanglements
        company
      }
      utopiaTestLink
      robinWoodProviderLink
      yearFounded
      shareholders
      employeeCount
      customerCount
      bankAccountsAt
      address
      federalState
      customerServiceEmail
      customerServicePhone
      connection
      connectionDetails
      legalInfo {
        termsLink
        cancellationLink
        privacyLink
        debitInfo
      }
    }
    rating {
      contributionByConsumption
      contributionPerCustomerAndYear
      additionalContribution
      supportsSmallProducers
      labelOkPower
      labelGruenerStrom
      labelTuevNord
      transparentSources
      buildsPowerStations
    }
  }
`
