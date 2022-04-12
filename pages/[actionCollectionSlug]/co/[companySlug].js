import { gql } from 'graphql-request'
import React from 'react'

import { ActionModules } from '../../../components/ActionModules'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { fetchData } from '../../../services/lfca'
import { QualifiedCompanyItemFragment } from '../../../services/lfca/fragments'
import { WITH_SIDEBAR } from '../../../utils'

export default function SupporterPage({
  actions,
  company,
  openGraphInfo,
  stats,
}) {
  return (
    <Layout
      company={company}
      layout={actions?.layout || WITH_SIDEBAR}
      nav={actions?.nav}
      openGraphInfo={openGraphInfo}
    >
      <ActionModules actions={actions?.items} stats={stats} />
    </Layout>
  )
}

const allParticipatingCompaniesQuery = gql`
  ${QualifiedCompanyItemFragment}
  query qualifiedCompanies($input: QualifiedCompaniesInput) {
    qualifiedCompanies(input: $input) {
      ...QualifiedCompanyItemFragment
    }
  }
`

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const { actionCollectionSlug, companySlug } = params
  const staticData = await fetchAllStaticData(locale, actionCollectionSlug)

  /**
   * NOTE:
   * We fetch ALL companies once (already on `getStaticPaths`)
   * and re-use the result from cache here
   */
  const cachedQualifiedCompanies = await fetchData({
    query: allParticipatingCompaniesQuery,
    variables: {
      input: {
        filter: {
          achievementContentIds: ['tfca2022Qualification'],
        },
      },
    },
  })
  let company = cachedQualifiedCompanies?.qualifiedCompanies?.find(
    ({ company }) => company.micrositeSlug === companySlug
  )

  if (!company) {
    // If the company was not part of the initial build,
    // we double check if the company has qualified in the meantime (after the initial build)
    const freshQualifiedCompanies = await fetchData({
      query: allParticipatingCompaniesQuery,
      skipCache: true,
      variables: {
        input: {
          filter: {
            achievementContentIds: ['tfca2022Qualification'],
            companyMicrositeSlugs: [companySlug],
          },
        },
      },
    })

    company = freshQualifiedCompanies?.qualifiedCompanies[0]
  }

  // If the company is still not qualified, we cache the 404 for 5 mins.
  if (!company) {
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }

  return {
    props: {
      ...staticData,
      company,
    },
    revalidate: 3600, // 1h
  }
}

export async function getStaticPaths() {
  const { qualifiedCompanies } = await fetchData({
    query: allParticipatingCompaniesQuery,
    variables: {
      input: {
        filter: {
          achievementContentIds: ['tfca2022Qualification'],
        },
      },
    },
  })

  return {
    fallback: 'blocking',
    // We only have company pages for the `int` collection and default locale
    paths: qualifiedCompanies.map(({ company }) => ({
      params: {
        actionCollectionSlug: 'int',
        companySlug: company.micrositeSlug,
      },
    })),
  }
}
