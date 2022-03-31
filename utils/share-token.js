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
  actionId = '',
  names = [],
  color = DEFAULT_COLOR,
  message = DEFAULT_MESSAGE,
  uid = null,
}) {
  return jwt.sign(
    {
      actionId,
      color: colorByName[color],
      iat: 1648205376, // Prevent the default timestamp to always create the same token for the same input
      message,
      names,
      uid,
    },
    process.env.JWT_TOKEN_PRIVATE_KEY
  )
}

export function decodeShareToken(token) {
  try {
    const { actionId, color, message, names, uid } = jwt.verify(
      token,
      process.env.JWT_TOKEN_PRIVATE_KEY
    )
    return {
      actionId,
      color,
      message,
      names,
      uid,
    }
  } catch (e) {
    return null
  }
}
