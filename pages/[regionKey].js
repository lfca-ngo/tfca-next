import React from 'react'

import SplitLayout from '../components/Layout/SplitLayout'

const ActionCollection = (props) => {
  console.log(props)
  return (
    <SplitLayout>
      <h1>Hallo!</h1>
    </SplitLayout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get the correct translations in
  // build time by passing it to the query

  // const query = gql`
  //   query getCollection($slug: String!) {
  //     pageLocalCollection(where: { slug: $slug }) {
  //       items {
  //         slug
  //         title
  //         bodyRichText {
  //           json
  //         }
  //         metaDescription
  //       }
  //     }
  //   }
  // `

  return {
    props: {
      // pageData: item,
    },
  }
}

export async function getStaticPaths() {
  // const query = gql`
  //   query {
  //     pageLocalCollection {
  //       items {
  //         slug
  //       }
  //     }
  //   }
  // `
  const paths = ['en']

  return {
    fallback: false,
    paths,
  }
}

export default ActionCollection
