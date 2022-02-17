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

// HACKY GRAPHQL CLIENT FOR wirklich-gruen.de API

export const IMG_BASE_URL = `https://backend.wirklich-gruen.de`
const API_URL = `https://api.wirklich-gruen.de/`
const KEY = `jPSNMYMmxDWLUMLKqYOF70hecLKcMfajfSRNKKIT`
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  authorization: KEY,
}

export const getOperatorId = async (zipCode) => {
  const fields = '{\ncity\noperators\n}\n}'
  const query = '{\nlocations(zipCode:' + `"${zipCode}"` + ')' + fields
  const getFirstOperatorId = (o) => Object.keys(o.operators)[0]

  return fetch(API_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((data) => {
      return {
        operatorId: getFirstOperatorId(data.data.locations[0] || []),
        city: data.data.locations[0].city,
      }
    })
    .catch((err) => {
      alert(err.toString())
      return {
        operatorId: null,
        city: null,
      }
    })
}

export const getSwitchRates = async (
  zipCode,
  city,
  consumption,
  operatorId
) => {
  if (!operatorId) return alert('Missing operatorId!')

  const fields =
    '{\nid\nname\naffiliateLink\nranking\nrating\n{\ncontributionByConsumption\n}\ndescription\nenergyDescription\nadvantages\nprice{\nbasePrice\nworkingPrice\n}\nemissions{\ntype\nvalue\n}\nminimumTerm{\nunit\nvalue\n}\nextendedTerm{\nunit\nvalue\n}\ncancellationPeriod{\nunit\nvalue\n}\npriceGuarantee{\ndate\nperiod\n{\nunit\nvalue\n}\n}\nenergyMix{\nsource\npercent\n}\nprovider{\nname\nabout\ntagline\nlegalName\ncustomerServicePhone\ncustomerServiceEmail\nutopiaTestLink\nyearFounded\naddress\nwebsite\nrobinWoodRating\n{\ncompanyName\n}\nrobinWoodRecommendation\n{\ncontribution\nenergySources\nentanglements\ncompany\n}\nlegalInfo\n{\ntermsLink\ncancellationLink\nprivacyLink\n}\nlogo\n{\nurl\nwidth\nheight\n}\n}\nlabels{\nname\ndescription\nauthority\nauthorityLink\nimage{\nurl\nwidth\nheight\n}\n}\n}\n}'

  const query =
    '{\nswitchRates(energy:power,zipCode:' +
    `"${zipCode}"` +
    ',consumption:' +
    `${consumption}` +
    ',city:' +
    `"${city}"` +
    ',operatorId:' +
    `"${operatorId}"` +
    ')' +
    fields

  return fetch(API_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((data) => data.data.switchRates || [])
    .catch((err) => alert(err.toString()))
}

export const getLocalRate = async (zipCode, operatorId) => {
  if (!operatorId) return alert('Missing operatorId!')

  const fields =
    '{\nid\nslug\nname\nzipCode\nprovider{\nname\nrobinWoodRating{\ncompanyName\ncriteriaId\nreason\nnote\nteaser\ntext\nlink\nrecommendation\n}\n}\nenergyMix{\nsource\npercent\n}\nzipCode\nemissions{\ntype\nvalue\n}\nminimumTerm{\nunit\nvalue\n}\nextendedTerm{\nunit\nvalue\n}\ncancellationPeriod{\nunit\nvalue\n}\npriceGuarantee{\ndate\nperiod{\nunit\nvalue\n}\n}\n\nprice{\nbasePrice\nworkingPrice\n}\n}\n}'

  const query =
    '{\nlocalRate(energy:power,zipCode:' +
    `"${zipCode}"` +
    ',id:' +
    `"${operatorId}"` +
    ')' +
    fields

  return fetch(API_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((data) => data.data.localRate || [])
    .catch((err) => alert(err.toString()))
}

export const getLocalRates = async (zipCode) => {
  if (!zipCode) return alert('Missing operatorId!')

  const fields = '{\nrates{\nid\nname\n}\n}\n}'

  const query =
    '{\nlocalRates(energy:power,zipCode:' + `"${zipCode}"` + ')' + fields

  return fetch(API_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((data) => data.data.localRates?.providers || [])
    .catch((err) => alert(err.toString()))
}

export const searchProvider = async (searchString) => {
  if (!searchString || searchString.length < 3) return []

  const fields = '{\nid\nname\n}\n}'

  const query =
    '{\nproviders(energy:"power",name:' + `"${searchString}"` + ')' + fields

  return fetch(API_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((data) => data.data.providers || [])
    .catch((err) => alert(err.toString()))
}
