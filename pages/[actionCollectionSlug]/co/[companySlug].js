import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { fetchData } from '../../../services/lfca'
import { QualifiedCompanyItemFragment } from '../../../services/lfca/fragments'
import { WITH_SIDEBAR } from '../../../utils'

export default function SupporterPage({ actions, company, stats }) {
  return (
    <Layout
      company={company}
      layout={actions?.layout || WITH_SIDEBAR}
      nav={actions?.nav}
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
   * and re-use the result from cache
   */
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
  const company = qualifiedCompanies.find(
    ({ company }) => company.micrositeSlug === companySlug
  )

  return {
    props: {
      ...staticData,
      company,
    },
  }
}

export async function getStaticPaths(
  {
    // locales
  }
) {
  // const actionsLocalCollectionQuery = gql`
  //   query {
  //     actionsLocalCollection(limit: 50) {
  //       items {
  //         slug
  //       }
  //     }
  //   }
  // `
  // const { actionsLocalCollection } = await fetchContent(
  //   actionsLocalCollectionQuery
  // )

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
    fallback: false,
    /**
     * TODO:
     * - Create paths for all possible combinations of
     *    - `locales`
     *    - `actionsLocalCollection`
     *    - `company`
     */
    paths: qualifiedCompanies.map(({ company }) => ({
      params: {
        actionCollectionSlug: 'int',
        companySlug: company.micrositeSlug,
      },
    })),
  }
}
