import { gql } from 'graphql-request'
import React from 'react'

import { DisclosureOverview } from '../components/DisclosureOverview'
import { QualifiedCompanyFragment } from '../fragments/contentful'
import { fetchData } from '../services/lfca'

export default function ImprintPage({ items }) {
  return <DisclosureOverview items={items} />
}

const allParticipatingCompaniesQuery = gql`
  ${QualifiedCompanyFragment}
  query qualifiedCompanies($input: QualifiedCompaniesInput) {
    qualifiedCompanies(input: $input) {
      ... on QualifiedCompanyItem {
        ...QualifiedCompanyFragment
      }
    }
  }
`

export async function getStaticProps() {
  const { qualifiedCompanies } = await fetchData(
    allParticipatingCompaniesQuery,
    {
      input: {
        filter: {
          achievementContentIds: ['hasNewCampaignQualification'],
        },
      },
    }
  )

  return {
    props: {
      items: qualifiedCompanies,
    },
  }
}
