import axios from 'axios'
import { useMutation } from 'react-query'

import { useUserId } from '../../hooks'

export const useTrackAction = () => {
  const userId = useUserId()

  // check if this user has already completed an action (flag in LS)
  // if not, set the flag

  return useMutation({
    mutationFn: (actionId) => {
      return axios.post('/api/track-complete-action', {
        actionId,
        userId,
      })
    },
  })
}
