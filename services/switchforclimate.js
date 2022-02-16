import { gql, request } from 'graphql-request'
import { QueryClient } from 'react-query'

// create a query client for every api
// is imported into the api provider
const switchForClimateClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

// Graphql Layer
// General function to query cf
const space = process.env.NEXT_PUBLIC_CF_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CF_ACCESS_TOKEN

export const fetchContent = async (query, variables) => {
  try {
    const res = await request({
      document: query,
      requestHeaders: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      url: `https://graphql.contentful.com/content/v1/spaces/${space}`,
      variables: variables,
    })
    return res
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}

// hooks to consume data
export const useContent = async (query, variables) => {
  if (!query) throw new Error('Must include query string')

  const res = await switchForClimateClient.fetchQuery(
    ['content'],
    fetchContent(query, variables)
  )

  return res.data
}
