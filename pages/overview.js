import { gql } from 'graphql-request'
import React from 'react'

import { DisclosureOverview } from '../components/DisclosureOverview'
import { fetchData } from '../services/lfca'
import { QualifiedCompanyItemFragment } from '../services/lfca/fragments'

export default function ImprintPage({ items }) {
  return <DisclosureOverview items={items} />
}

const allParticipatingCompaniesQuery = gql`
  ${QualifiedCompanyItemFragment}
  query qualifiedCompanies($input: QualifiedCompaniesInput) {
    qualifiedCompanies(input: $input) {
      ...QualifiedCompanyItemFragment
    }
  }
`

export async function getStaticProps() {
  const { qualifiedCompanies } = await fetchData(
    allParticipatingCompaniesQuery,
    {
      input: {
        filter: {
          achievementContentIds: ['tfca2022Qualification'],
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
