import crypto from 'crypto'
import fs from 'fs'
import { request } from 'graphql-request'
import path from 'path'

import { isDev } from '../../utils'

const space = process.env.NEXT_PUBLIC_CF_SPACE_ID
const accessToken = isDev
  ? process.env.NEXT_PUBLIC_CF_PREVIEW_ACCESS_TOKEN
  : process.env.NEXT_PUBLIC_CF_ACCESS_TOKEN

// Generic GraphQL client for contentful used
// by all subsequent queries, can also called directly
export const fetchContent = async (query, variables) => {
  const hash = crypto
    .createHash('md5')
    .update(query + JSON.stringify(variables || {}))
    .digest('hex')

  const CACHE_PATH = path.join(__dirname, `.${hash}`)

  let data

  if (!process.env.DISABLE_CONTENTFUL_SERVICE_CACHE) {
    // Try getting the data from cache
    try {
      data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
    } catch (error) {
      // Nothing to do
    }
  }

  if (!data) {
    data = await request({
      document: query,
      requestHeaders: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      url: `https://graphql.contentful.com/content/v1/spaces/${space}`,
      variables: variables,
    })

    // Write data to cache
    if (data) {
      try {
        fs.writeFileSync(CACHE_PATH, JSON.stringify(data), 'utf8')
      } catch (e) {
        console.error('Error writing to cache', e)
      }
    }
  }

  return data
}
