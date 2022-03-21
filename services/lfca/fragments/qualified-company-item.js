import { gql } from 'graphql-request'

export const QualifiedCompanyItemFragment = gql`
  fragment QualifiedCompanyItemFragment on QualifiedCompanyItem {
    company {
      campaignGoalSetting
      campaignParticipationPackages
      campaignGoals
      id
      logoUrl
      micrositeSlug
      name
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
