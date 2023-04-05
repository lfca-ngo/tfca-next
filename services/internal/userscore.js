import { useQuery } from 'react-query'

import { fetchData } from '.'

export const USER_SCORE_QUERY_KEY = 'userScore'

export const useUserScore = (userId, options = {}) => {
  let queryString = `userId=${userId}`

  return useQuery(
    [USER_SCORE_QUERY_KEY, queryString],
    async () => fetchData('/api/teams/get-user-score', queryString),
    options
  )
}
