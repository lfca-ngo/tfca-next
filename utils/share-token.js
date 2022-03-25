import jwt from 'jsonwebtoken'

export function createShareToken({ actionId = '', names = [] }) {
  return jwt.sign(
    {
      actionId,
      iat: 1648205376, // Prevent the default timestamp to always create the same token for the same input
      names,
    },
    process.env.JWT_TOKEN_PRIVATE_KEY
  )
}

export function decodeShareToken(token) {
  try {
    const { actionId, names } = jwt.verify(
      token,
      process.env.JWT_TOKEN_PRIVATE_KEY
    )
    return {
      actionId,
      names,
    }
  } catch (e) {
    return null
  }
}
