import { useQuery } from 'react-query'

import { fetchData } from '.'

export const useUserScore = (userId, options) => {
  let queryString = `userId=${userId}`

  return useQuery(
    ['userScore', queryString],
    async () => fetchData('/api/teams/get-user-score', queryString),
    options
  )
}
