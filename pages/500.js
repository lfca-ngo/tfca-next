import React from 'react'

import { Layout } from '../components/Layout'
import { fetchAllStaticContent } from '../services/contentful'

export default function ErrorPage() {
  return <Layout errorCode={500} layout="error" />
}

export async function getStaticProps({ locale }) {
  const content = await fetchAllStaticContent(locale)

  return {
    props: {
      content,
    },
  }
}
