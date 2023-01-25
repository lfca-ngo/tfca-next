import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../utils'
import { useCustomization } from './app'

export const useUserId = () => {
  const customization = useCustomization()

  // if a uid is set from the invite link use it
  if (customization?.invitedUserId) return customization.invitedUserId

  //  If no uid is set, check in the cookie
  const cookieUid = getCookie(UID_COOKIE_NAME)
  if (cookieUid) return cookieUid

  // If no cookie is allowed and no link with uid is present, create a fresh uid
  // and save it in the window variable of the browser
  return getWindowUid()
}
