import { gql, request } from 'graphql-request'
import { QueryClient } from 'react-query'

// create a query client for every api
// is imported into the api provider
const contentfulClient = new QueryClient({
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

const fetchContent = async (query, variables) => {
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

// specific functions for each query
const fetchActions = async () => {
  const query = gql`
    query {
      actionCollection {
        items {
          actionId
          title
          icon {
            url
          }
          about
          explanation {
            json
          }
        }
      }
    }
  `
  const res = await fetchContent(query)
  return res || [] // handle defalut cases
}

// hooks to consume data
export const useContent = async () => {
  // if (!id) throw new Error("Must include campaign id");

  const query = contentfulClient.fetchQuery(['content'], fetchActions())

  return query.data
}
