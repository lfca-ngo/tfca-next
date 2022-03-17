import { gql } from 'graphql-request'

export const QualifiedCompanyItemFragment = gql`
  fragment QualifiedCompanyItemFragment on QualifiedCompanyItem {
    company {
      id
      name
      micrositeSlug
      logoUrl
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
