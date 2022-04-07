import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export const createKey = (query) => {
  return crypto.createHash('md5').update(JSON.stringify(query)).digest('hex')
}

export const setData = (key, data) => {
  const CACHE_PATH = path.join(__dirname, `.${key}`)
  fs.writeFileSync(CACHE_PATH, JSON.stringify(data), 'utf8')
}

export const getData = (key) => {
  if (process.env.DISABLE_CONTENTFUL_SERVICE_CACHE) return null
  const CACHE_PATH = path.join(__dirname, `.${key}`)

  // Try getting the data from cache
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
    return data
  } catch (error) {
    return null
  }
}
