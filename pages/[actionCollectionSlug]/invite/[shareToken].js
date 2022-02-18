import { Typography } from 'antd'
import jwt from 'jsonwebtoken'
import Head from 'next/head'
import React from 'react'

import SplitLayout from '../../../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
} from '../../../services/contentful'

const { Title } = Typography

export default function InvitePage({
  friend1,
  friend2,
  friend3,
  ogImageUrl,
  self,
}) {
  return (
    <>
      <Head>
        <meta content={ogImageUrl} property="og:image" />
      </Head>
      return (
      <SplitLayout>
        <Title
          level={2}
        >{`Hey ${friend1.name}, ${friend2.name} and ${friend3.name} you have been invited by ${self.name} to take action!`}</Title>
      </SplitLayout>
      )
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
        actions: actions,
        content: content,
        friend1,
        friend2,
        friend3,
        ogImageUrl: `${process.env.BASE_URL}/api/images/${shareToken}`,
        self,
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
