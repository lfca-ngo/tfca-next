import { useQuery } from 'react-query'

export const fetchData = async (queryString) => {
  const url = `/api/politicians?${queryString}`
  const resp = await fetch(url)
  const json = await resp.json()
  return json
}

export const usePoliticians = (filters = {}) => {
  let queryString = ''

  Object.keys(filters).forEach((key) => {
    queryString += `filter.${key}=${filters[key]}&`
  })

  return useQuery(['meps', queryString], async () => fetchData(queryString))
}
