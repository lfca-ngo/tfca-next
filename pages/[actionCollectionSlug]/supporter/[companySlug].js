import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import SplitLayout from '../../../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
  fetchContent,
} from '../../../services/contentful'

export default function SupporterPage({ actions }) {
  return (
    <SplitLayout>
      <ActionModules actions={actions} />
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
   * - Fetch completed companyActions from GQL BE
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
  const query = gql`
    query {
      actionsLocalCollection(limit: 50) {
        items {
          slug
        }
      }
    }
  `
  const { actionsLocalCollection } = await fetchContent(query)

  /**
   * TODO:
   * - Fetch all supporting companies
   * - Create paths for all possible combinations of
   *    - `locales`
   *    - `actionsLocalCollection`
   *    - `company`
   */

  return {
    fallback: 'blocking', // TODO: set to `false` once `getStaticPaths` is implemeted
    paths: [],
  }
}
