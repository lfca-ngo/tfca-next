import { useRouter } from 'next/router'

import { useUserScore } from '../services/internal/userscore'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../utils'
import { useCustomization } from './app'

export const SERVER_UID = 'server_uid'

const useUserId = (customization) => {
  // if a uid is set from the invite link use it
  if (customization?.invitedUserId) return customization.invitedUserId

  //  If no uid is set, check in the cookie
  const cookieUid = getCookie(UID_COOKIE_NAME)
  if (cookieUid) return cookieUid

  // If no cookie is allowed and no link with uid is present, create a fresh uid
  // and save it in the window variable of the browser
  return getWindowUid()
}

export const useUser = () => {
  const { query } = useRouter()
  const customization = useCustomization()
  const userId = useUserId(customization)

  // check if this user is already created on the server
  const serverCookieUid = getCookie(SERVER_UID)
  const isSameUser = serverCookieUid === userId
  const isServerUser = !!serverCookieUid && isSameUser

  // only if a cookie is set, fetch the user data
  const {
    data,
    isLoading,
    refetch: refetchUserScore,
  } = useUserScore(userId, {
    enabled: isServerUser,
  })
  let user = data?.user || {}

  // even when the user is not yet created on the server,
  // we can derive his first name from the invitation
  if (!user && customization?.invitedUserName) {
    user.firstName = customization.invitedUserName
  }

  // the teamId can be also set via query url
  if (query?.teamId) {
    user.teamId = user?.teamId || query?.teamId
  }

  return {
    isLoading,
    isServerUser,
    refetchUserScore,
    user,
    userId,
    userScore: data?.userScore,
  }
}
