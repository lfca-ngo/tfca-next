import { gql } from 'graphql-request'

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
