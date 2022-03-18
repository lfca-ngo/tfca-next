import { useQuery } from 'react-query'

export const fetchData = async (queryString) => {
  const url = `/api/politicians?${queryString}`
  const resp = await fetch(url)
  const json = await resp.json()
  return json
}

export const usePoliticians = ({ badges = '', countries = '', zip = '' }) => {
  const queryString = `filter.countries=${countries}&filter.zip=${zip}&filter.badges=${badges}`

  return useQuery(['meps', queryString], async () => fetchData(queryString))
}
