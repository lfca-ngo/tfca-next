import axios from 'axios'
import { useMutation } from 'react-query'

import { useUser } from '../../hooks'

export const useTrackAction = (options = {}) => {
  const { userId } = useUser()

  // check if this user has already completed an action (flag in LS)
  // if not, set the flag

  return useMutation({
    mutationFn: (actionId) => {
      return axios.post('/api/teams/track-complete-action', {
        actionId,
        userId,
      })
    },
    ...options,
  })
}
