import axios from 'axios'
import { useMutation } from 'react-query'

import { useCustomization } from '../../hooks'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../utils'

export const useTrackAction = () => {
  const userId = getCookie(UID_COOKIE_NAME) || getWindowUid()
  const { uid: referredByUserId } = useCustomization() || {}

  return useMutation({
    mutationFn: (actionId) => {
      // track completed actions only for users that came through referral
      if (!referredByUserId) return

      return axios.post('/api/track-complete-action', {
        actionId,
        referredByUserId,
        userId,
      })
    },
  })
}
