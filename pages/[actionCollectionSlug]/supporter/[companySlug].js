import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import SplitLayout from '../../../components/Layout/SplitLayout'
import { QualifiedCompanyFragment } from '../../../fragments/contentful'
import { fetchAllStaticData } from '../../../services'
import { fetchData } from '../../../services/lfca'

export default function SupporterPage({ actions, company, stats }) {
  return (
    <SplitLayout company={company} layout={actions?.layout} nav={actions?.nav}>
      <ActionModules actions={actions?.items} stats={stats} />
    </SplitLayout>
  )
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
      customization: {
        from: companySlug,
        to: 'YOU!',
      },
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
        actionCollectionSlug: 'new',
        companySlug: company.micrositeSlug,
      },
    })),
  }
}
