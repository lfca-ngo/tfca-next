import { useQuery, useQueryClient } from 'react-query'

import { SERVER_UID } from '../../hooks'
import { setCookie } from '../../utils'
import { fetchData } from '.'

export const USER_SCORE_QUERY_KEY = 'userScore'

export const useInvalidateUserScore = () => {
  const queryClient = useQueryClient()

  const invalidate = (userId) => {
    // first set the server uid
    setCookie(SERVER_UID, userId)
    // then invalidate the query
    queryClient.invalidateQueries(USER_SCORE_QUERY_KEY)
  }

  return invalidate
}

export const useUserScore = (userId, options = {}) => {
  let queryString = `userId=${userId}`

  return useQuery(
    [USER_SCORE_QUERY_KEY, queryString],
    async () => fetchData('/api/teams/get-user-score', queryString),
    options
  )
}
