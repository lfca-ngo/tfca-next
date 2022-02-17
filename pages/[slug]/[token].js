import { Typography } from 'antd'
import { gql } from 'graphql-request'
import jwt from 'jsonwebtoken'
import Head from 'next/head'
import React from 'react'

import SplitLayout from '../../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
} from '../../services/contentful'

const { Title } = Typography

export default function ShareLandingPage({
  friend1,
  friend2,
  friend3,
  self,
  token,
}) {
  return (
    <>
      <Head>
        <meta content={`/api/images/${token}`} property="og:image" />
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
    const { slug, token } = params

    // Parse token
    const parsedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY)

    // Fetch content
    const actions = await fetchAllActions(locale, slug)
    const content = await fetchAllStaticContent(locale)

    return {
      props: {
        actions: actions,
        content: content,
        locale,
        ...parsedToken,
        token,
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
