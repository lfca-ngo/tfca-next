import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'

import { SwitchRateFragment } from '../fragments'

// Graphql Layer
export const fetchData = async (query, variables) => {
  try {
    const res = await request({
      document: query,
      requestHeaders: {
        Accept: 'application/json',
        authorization: process.env.NEXT_PUBLIC_SWITCH_CLIMATE_KEY,
        'Content-Type': 'application/json',
      },
      url: process.env.NEXT_PUBLIC_SWITCH_CLIMATE_API_URL,
      variables: variables,
    })
    return res
  } catch (error) {
    throw error
  }
}

// hooks to consume specific data
export const useSwitchRates = (zipCode, city, consumption, operatorId) => {
  const query = gql`
    ${SwitchRateFragment}
    query (
      $zipCode: String!
      $city: String!
      $consumption: Int!
      $operatorId: String!
    ) {
      switchRates(
        energy: power
        consumption: $consumption
        zipCode: $zipCode
        city: $city
        operatorId: $operatorId
      ) {
        ...SwitchRateFragment
      }
    }
  `
  const variables = {
    city,
    consumption,
    operatorId,
    zipCode,
  }

  return useQuery(
    ['switch_rates', consumption, zipCode, operatorId],
    async () => fetchData(query, variables),
    { enabled: !!operatorId }
  )
}

export const useOperatorId = (zipCode) => {
  if (!zipCode) throw new Error('Must include zipCode')

  const query = gql`
    query ($zipCode: String!) {
      locations(zipCode: $zipCode) {
        city
        operators
      }
    }
  `
  const variables = {
    zipCode,
  }

  return useQuery(['locations', zipCode], async () =>
    fetchData(query, variables)
  )
}

export const useLocalRate = (zipCode, operatorId) => {
  if (!zipCode || !operatorId)
    throw new Error('Must include zipCode and operatorId')

  const query = gql`
    query ($zipCode: String!, $operatorId: String!) {
      localRate(energy: power, id: $operatorId, zipCode: $zipCode) {
        id
        slug
        name
        zipCode
      }
    }
  `
  // '{\nid\nslug\nname\nzipCode\nprovider{\nname\nrobinWoodRating{\ncompanyName\ncriteriaId\nreason\nnote\nteaser\ntext\nlink\nrecommendation\n}\n}\nenergyMix{\nsource\npercent\n}\nzipCode\nemissions{\ntype\nvalue\n}\nminimumTerm{\nunit\nvalue\n}\nextendedTerm{\nunit\nvalue\n}\ncancellationPeriod{\nunit\nvalue\n}\npriceGuarantee{\ndate\nperiod{\nunit\nvalue\n}\n}\n\nprice{\nbasePrice\nworkingPrice\n}\n}\n}'
  const variables = {
    operatorId,
    zipCode,
  }

  return useQuery(['localRate', operatorId, zipCode], async () =>
    fetchData(query, variables)
  )
}

export const useLocalRates = (zipCode) => {
  if (!zipCode) throw new Error('Must include zipCode')

  const query = gql`
    query ($zipCode: String!) {
      localRates(energy: power, zipCode: $zipCode) {
        rates {
          id
          name
        }
      }
    }
  `

  const variables = {
    zipCode,
  }

  return useQuery(['localRates', zipCode], async () =>
    fetchData(query, variables)
  )
}

export const useSearchProvider = (searchString) => {
  const query = gql`
    query ($zipCode: String!) {
      providers(energy: power, name: $searchString) {
        name
      }
    }
  `

  const variables = {
    searchString,
  }

  return useQuery(['providersSearch', searchString], async () =>
    fetchData(query, variables)
  )
}
