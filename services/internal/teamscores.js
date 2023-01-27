import { useQuery } from 'react-query'

import { fetchData } from '.'

export const useTeamScores = (teamId) => {
  let queryString = `team=${teamId}`

  return useQuery(['teamScores', queryString], async () =>
    fetchData('/api/teams/get-team-scores', queryString)
  )
}
