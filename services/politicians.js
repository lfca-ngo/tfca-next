import { useQuery } from 'react-query'

export const fetchData = async (queryString) => {
  const url = `/api/politicians?${queryString}`
  const resp = await fetch(url)
  const json = await resp.json()
  return json
}

export const usePoliticians = (country, badges) => {
  const queryString = `filter.countries=${country}&filter.badges=${badges.join(
    ','
  )}`

  return useQuery(['meps', queryString], async () => fetchData(queryString))
}
