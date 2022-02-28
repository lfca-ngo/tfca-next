import crypto from 'crypto'
import fs from 'fs'
import { gql, request } from 'graphql-request'
import path from 'path'

export const fetchData = async (query, variables) => {
  const hash = crypto
    .createHash('md5')
    .update(query + JSON.stringify(variables || {}))
    .digest('hex')

  const CACHE_PATH = path.join(__dirname, `.${hash}`)

  let data

  // Try getting the data from cache
  try {
    data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
    console.info('Cache hit (lfca)')
  } catch (error) {
    console.info('Cache miss (lfca)')
  }

  if (!data) {
    // Fetch fresh data if no cached data is available
    try {
      data =
        (await request({
          document: query,
          requestHeaders: {
            authorization: `Bearer ${process.env.LFCA_BE_ADMIN_TOKEN}`,
            'content-type': 'application/json',
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
      console.info('Wrote to cache (lfca)')
    } catch (e) {
      console.error('Error writing to cache', e)
    }
  }

  return data
}
