export const fetchData = async (path, queryString, options = {}) => {
  const url = `${path}?${queryString}`
  const resp = await fetch(url, options)
  const json = await resp.json()
  return json
}
