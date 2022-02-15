import { useCookies } from 'react-cookie'

import {
  COOKIE,
  trackEvent as trackEventApi,
  trackUser as trackUserApi,
} from '../api/internal'
import { isDev } from '../utils'

// tracking can be manually disabled in development
// by setting TRACKING_DISABLED to true
const TRACKING_DISABLED = isDev && true

const useAnalytics = () => {
  const [cookies, setReactCookie] = useCookies()
  const userId = cookies[COOKIE]

  const trackUser = async () => {
    const newUserId = await trackUserApi()
    setReactCookie(COOKIE, newUserId)
    return newUserId
  }

  const trackEvent = async (name, values) => {
    if (TRACKING_DISABLED) return { status: 200 }

    if (!userId) {
      const newUserId = await trackUser()
      return trackEventApi(newUserId, name, values)
    } else {
      return trackEventApi(userId, name, values)
    }
  }

  return { trackEvent }
}

export default useAnalytics
