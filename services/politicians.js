import { useQuery } from 'react-query'

export const fetchData = async (queryString) => {
  const url = `/api/politicians?${queryString}`
  const resp = await fetch(url)
  const json = await resp.json()
  return json
}

export const usePoliticians = ({ country, topic, zip }) => {
  const queryString = `filter.countries=${country}&filter.zip=${zip}&filter.badges=${topic}`

  return useQuery(['meps', queryString], async () => fetchData(queryString))
}
