import axios from 'axios'
import { useMutation } from 'react-query'

import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../utils'

export const useTrackAction = () => {
  const userId = getCookie(UID_COOKIE_NAME) || getWindowUid()

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
