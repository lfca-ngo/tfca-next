import { Typography } from 'antd'
import jwt from 'jsonwebtoken'
import Head from 'next/head'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import SplitLayout from '../../../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
} from '../../../services/contentful'

const { Title } = Typography

export default function InvitePage({ actions, ogImageUrl }) {
  return (
    <>
      <Head>
        <meta content={ogImageUrl} property="og:image" />
      </Head>
      <SplitLayout>
        <ActionModules actions={actions} />
      </SplitLayout>
    </>
  )
}

export async function getStaticProps(props) {
  const { locale, params } = props
  try {
    const { actionCollectionSlug, shareToken } = params

    // Parse token
    const { friend1, friend2, friend3, self } = jwt.verify(
      shareToken,
      process.env.JWT_TOKEN_PRIVATE_KEY
    )

    // Fetch content
    const actions = await fetchAllActions(locale, actionCollectionSlug)
    const content = await fetchAllStaticContent(locale)

    return {
      props: {
        actions,
        content,
        customization: {
          from: self.name,
          to: `${friend1.name}, ${friend2.name} and ${friend3.name}`,
        },
        ogImageUrl: `${process.env.BASE_URL}/api/images/${shareToken}`,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  return { fallback: 'blocking', paths: [] }
}
