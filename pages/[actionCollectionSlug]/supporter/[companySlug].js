import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import SplitLayout from '../../../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
  fetchContent,
} from '../../../services/contentful'
import { fetchData } from '../../../services/lfca'

export default function SupporterPage({ actions }) {
  return (
    <SplitLayout nav={actions?.nav}>
      <ActionModules actions={actions?.items} />
    </SplitLayout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const { actionCollection, companySlug } = params

  const actions = await fetchAllActions(locale, actionCollection)
  const content = await fetchAllStaticContent(locale)

  /**
   * TODO:
   * - Fetch company from firebase
   * - Fetch completed companyActions from GQL BE (maybe fetch ALL actions once and re-use from cache)
   */

  return {
    props: {
      actions,
      content,
      customization: {
        from: companySlug,
        to: 'YOU!',
      },
    },
  }
}

export async function getStaticPaths({ locales }) {
  const actionsLocalCollectionQuery = gql`
    query {
      actionsLocalCollection(limit: 50) {
        items {
          slug
        }
      }
    }
  `
  const { actionsLocalCollection } = await fetchContent(
    actionsLocalCollectionQuery
  )

  const qualifiedCompaniesQuery = gql`
    query qualifiedCompanies($input: QualifiedCompaniesInput) {
      qualifiedCompanies(input: $input) {
        company {
          id
          micrositeSlug
          name
          logoUrl
        }
      }
    }
  `

  const { qualifiedCompanies } = await fetchData(qualifiedCompaniesQuery)

  return {
    fallback: false,
    /**
     * TODO: Instead of using badge qualification:
     * - Fetch all supporting companies
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
