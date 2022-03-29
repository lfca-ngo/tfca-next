import { gql, request } from 'graphql-request'
import { useMutation, useQuery } from 'react-query'

import { SwitchRateFragment } from './fragments'

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

export const postData = async (urlPath, payload) => {
  const url = `${process.env.NEXT_PUBLIC_SWITCH_CLIMATE_BE_URL}${urlPath}`

  const resp = await fetch(url, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const json = await resp.json()
  return json
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

export const useSearchProvider = (name) => {
  const query = gql`
    query ($energy: String, $name: String) {
      providers(energy: $energy, name: $name) {
        id
        name
      }
    }
  `

  const variables = {
    energy: 'power',
    name,
  }

  return useQuery(['providersSearch', name], async () =>
    fetchData(query, variables)
  )
}

export const useSearchRobinWoodProvider = (name) => {
  const query = gql`
    query ($name: String!) {
      robinWoodProviders(name: $name) {
        companyName
      }
    }
  `

  const variables = {
    name,
  }

  return useQuery(['robinWoodSearch', name], async () =>
    fetchData(query, variables)
  )
}

export const useRobinWoodRating = (companyName) => {
  const query = gql`
    query ($companyName: String!) {
      robinWoodRating(companyName: $companyName) {
        companyName
        criteriaId
        reason
        note
        teaser
        text
        link
        recommendation
      }
    }
  `

  const variables = {
    companyName,
  }

  return useQuery(
    ['robinWoodRating', companyName],
    async () => fetchData(query, variables),
    {
      enabled: !!companyName,
    }
  )
}

export const useSwitchOrder = () => {
  return useMutation((payload) => postData('/switch-orders', payload))
}
