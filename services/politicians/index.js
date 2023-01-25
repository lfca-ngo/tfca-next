import { useQuery } from 'react-query'

import { fetchData } from '..'

export const usePoliticians = (filters = {}) => {
  let queryString = ''

  Object.keys(filters).forEach((key) => {
    queryString += `filter.${key}=${filters[key]}&`
  })

  return useQuery(['meps', queryString], async () => fetchData(queryString))
}
