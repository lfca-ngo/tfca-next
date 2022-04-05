import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { fetchContent } from '../../../services/contentful'
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

export async function getStaticPaths({ locales }) {
  const query = gql`
    query {
      actionsLocalCollection(limit: 50) {
        items {
          layout
          slug
        }
      }
    }
  `
  const { actionsLocalCollection } = await fetchContent(query)

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

  /**
   * - Create paths for all possible combinations of
   *    - `actionsLocalCollection`
   *    - `company`
   *    - `locale`
   */
  const paths = qualifiedCompanies.reduce((allPaths, { company }) => {
    return allPaths.concat(
      actionsLocalCollection.items.reduce((companyPaths, item) => {
        // prevent old pages from being built
        if (typeof item.layout !== 'string') return companyPaths

        const pagePaths = locales.map((locale) => ({
          locale,
          params: {
            actionCollectionSlug: item.slug,
            companySlug: company.micrositeSlug,
          },
        }))

        return [...companyPaths, ...pagePaths]
      }, [])
    )
  }, [])

  return {
    fallback: false,
    paths,
  }
}
