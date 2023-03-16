import jwt from 'jsonwebtoken'

export const DEFAULT_SHARING_IMAGE_URL =
  'https://res.cloudinary.com/dhpk1grmy/image/upload/v1676207800/TFCA%20Campaign/Share%20Images/og-image-tfca_tue9xc.png'
const FIREBASE_SHORT_LINK_API_URL = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_API_KEY}`

export function createShareToken({
  invitedUserId,
  invitedUserName,
  referredByTeamId,
  referredByUserId,
  senderName,
}) {
  return jwt.sign(
    {
      iat: 1648205376, // Prevent the default timestamp to always create the same token for the same input
      invitedUserId, // will be set on the client as the receiving users id
      invitedUserName,
      referredByTeamId,
      referredByUserId, // uid of the person that sent the invite
      senderName,
    },
    process.env.JWT_TOKEN_PRIVATE_KEY
  )
}

export function decodeShareToken(token) {
  try {
    const {
      invitedUserId = null,
      invitedUserName = null,
      referredByTeamId = null,
      referredByUserId = null,
      senderName = null,
    } = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY)

    return {
      invitedUserId,
      invitedUserName,
      referredByTeamId,
      referredByUserId,
      senderName,
    }
  } catch (e) {
    return null
  }
}

export const createInviteLink = async (
  shareLink,
  ogImageUrl,
  socialTitle,
  socialDescription
) => {
  const response = await fetch(FIREBASE_SHORT_LINK_API_URL, {
    body: JSON.stringify({
      dynamicLinkInfo: {
        androidInfo: {
          androidFallbackLink: shareLink,
        },
        domainUriPrefix: 'share.tfca.earth',
        iosInfo: {
          iosFallbackLink: shareLink,
        },
        link: shareLink,
        navigationInfo: {
          enableForcedRedirect: true,
        },
        socialMetaTagInfo: {
          socialDescription,
          socialImageLink: ogImageUrl,
          socialTitle,
        },
      },
      suffix: {
        option: 'SHORT',
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const { shortLink } = await response.json()

  return shortLink
}
