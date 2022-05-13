import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import React from 'react'

import { ActionModules } from '../../../components/ActionModules'
import { HomeLoader } from '../../../components/Elements'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { fetchData } from '../../../services/lfca'
import { QualifiedCompanyFragment } from '../../../services/lfca/fragments'
import { WITH_SIDEBAR } from '../../../utils'

export default function SupporterPage({
  actions,
  company,
  openGraphInfo,
  stats,
}) {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <HomeLoader />
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
  ${QualifiedCompanyFragment}
  query qualifiedCompanies($input: QualifiedCompaniesInput!) {
    qualifiedCompanies(input: $input) {
      ...QualifiedCompanyFragment
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
        achievementContentIds: ['tfca2022Qualification'],
      },
    },
  })
  let company = cachedQualifiedCompanies?.qualifiedCompanies?.find(
    (company) => company.micrositeSlug === companySlug
  )

  if (!company) {
    // If the company was not part of the initial build,
    // we double check if the company has qualified in the meantime (after the initial build)
    const freshQualifiedCompanies = await fetchData({
      query: allParticipatingCompaniesQuery,
      skipCache: true,
      variables: {
        input: {
          achievementContentIds: ['tfca2022Qualification'],
          filter: {
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
        achievementContentIds: ['tfca2022Qualification'],
      },
    },
  })

  return {
    fallback: true,
    /**
     * NOTE:
     * We only create company pages for `en/int` and `de/deu` during build time.
     * All other combinations will be built incrementally once requested.
     */
    paths: qualifiedCompanies
      .filter((company) => !!company.micrositeSlug)
      .reduce((allPaths, company) => {
        return [
          ...allPaths,
          {
            locale: 'en',
            params: {
              actionCollectionSlug: 'int',
              companySlug: company.micrositeSlug,
            },
          },
          {
            locale: 'de',
            params: {
              actionCollectionSlug: 'deu',
              companySlug: company.micrositeSlug,
            },
          },
        ]
      }, []),
  }
}
