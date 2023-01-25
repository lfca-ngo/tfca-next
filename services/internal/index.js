export const fetchData = async (path, queryString) => {
  const url = `${path}?${queryString}`
  const resp = await fetch(url)
  const json = await resp.json()
  return json
}
