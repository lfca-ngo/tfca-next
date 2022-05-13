import { gql } from 'graphql-request'

export const QualifiedCompanyFragment = gql`
  fragment QualifiedCompanyFragment on Company {
    campaignGoalSetting
    campaignParticipationPackages
    campaignGoals
    campaignFiles {
      name
      url
    }
    campaignContribution
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
    id
    logoUrl
    micrositeSlug
    name
  }
`
