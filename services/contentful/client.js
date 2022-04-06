import * as contentful from 'contentful'

import { isDev } from '../../utils'

export const client = contentful.createClient({
  accessToken: isDev
    ? process.env.NEXT_PUBLIC_CF_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CF_ACCESS_TOKEN,
  host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com',
  space: process.env.NEXT_PUBLIC_CF_SPACE_ID,
})
