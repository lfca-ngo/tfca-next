import jwt from 'jsonwebtoken'

const DEFAULT_COLOR = 'blue'
const DEFAULT_MESSAGE = 'I took action for a brighter tomorrow'

const colorByName = {
  blue: '#1f335e',
  green: '#009976',
  lila: '#622860',
  orange: '#ff832c',
  pink: '#d82086',
  purple: '#5001ab',
  'purple-light': '#c899fd',
  yellow: '#f2ca49',
}

export function createShareToken({
  actionId,
  invitedUserId,
  name,
  color = DEFAULT_COLOR,
  message = DEFAULT_MESSAGE,
  sender,
  teamId,
  uid,
}) {
  return jwt.sign(
    {
      actionId,
      color: colorByName[color],
      iat: 1648205376, // Prevent the default timestamp to always create the same token for the same input
      invitedUserId,
      message,
      name,
      sender,
      teamId,
      uid,
    },
    process.env.JWT_TOKEN_PRIVATE_KEY
  )
}

export function decodeShareToken(token) {
  try {
    const {
      actionId = null,
      color = null,
      invitedUserId = null,
      message = null,
      name = null,
      sender = null,
      teamId = null,
      uid = null,
    } = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY)

    return {
      actionId,
      color,
      invitedUserId,
      message,
      name,
      sender,
      teamId,
      uid,
    }
  } catch (e) {
    return null
  }
}
