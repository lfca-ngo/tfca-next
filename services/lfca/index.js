import crypto from 'crypto'
import fs from 'fs'
import { request } from 'graphql-request'
import path from 'path'

export const fetchData = async ({ query, skipCache = false, variables }) => {
  const hash = crypto
    .createHash('md5')
    .update(query + JSON.stringify(variables || {}))
    .digest('hex')

  const CACHE_PATH = path.join(__dirname, `.${hash}`)

  let data

  if (!process.env.DISABLE_LFCA_SERVICE_CACHE && !skipCache) {
    // Try getting the data from cache
    try {
      data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
    } catch (error) {
      // Nothing to do
    }
  }

  if (!data) {
    // Fetch fresh data if no cached data is available
    try {
      data =
        (await request({
          document: query,
          requestHeaders: {
            authorization: `Bearer ${process.env.LFCA_BE_ADMIN_TOKEN}`,
            'x-graphql-client-name': 'lfca-community-app',
            'x-graphql-client-version':
              process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'local',
          },
          url: process.env.LFCA_BE_URL,
          variables: variables,
        })) || {}
    } catch (error) {
      console.error(
        `There was a problem retrieving entries with the query ${query}`
      )
      console.error(error)
    }

    // Write data to cache
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(data), 'utf8')
    } catch (e) {
      // Nothing to do here
    }
  }

  return data
}
