import { v4 as uuidv4 } from 'uuid'

import { trackInvite } from '../../services/firebase'
import { createShareToken } from '../../utils-server-only'

const DEFAULT_SHARING_IMAGE_URL =
  'https://res.cloudinary.com/dhpk1grmy/image/upload/v1676207800/TFCA%20Campaign/Share%20Images/og-image-tfca_tue9xc.png'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const {
    actionCollectionSlug,
    actionId,
    color,
    invitedUserName = null,
    locale,
    message,
    referredByTeamId = null,
    referredByUserId = null,
    senderName,
    socialDescription = '',
    socialImage = DEFAULT_SHARING_IMAGE_URL,
    socialTitle = '',
    teamId = null,
    userId,
  } = req.body

  // we create the uid for the invited user here
  // this will be set in the client of the user
  // that accepted the invite
  const invitedUserId = uuidv4()

  const token = createShareToken({
    actionId,
    color,
    invitedUserId,
    invitedUserName,
    message,
    referredByTeamId: teamId, // this is the inviting users teamId, NOT the team that she got invited from
    referredByUserId: userId, // this is the inviting users userId, NOT the userId of the person that she got invited from
    senderName,
  })

  const shareLink = `${process.env.NEXT_PUBLIC_URL}/${
    locale ? `${locale}/` : ''
  }${actionCollectionSlug}/invite/${token}`
  const ogImageUrl = !invitedUserName
    ? socialImage
    : `${process.env.NEXT_PUBLIC_URL}/api/images/${token}`

  // Create short link
  try {
    const response = await fetch(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_API_KEY}`,
      {
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
      }
    )
    const { shortLink } = await response.json()

    // test firestore
    await trackInvite({
      invitedUserId,
      invitedUserName,
      referredByTeamId,
      referredByUserId,
      senderName: senderName,
      shortLink,
      teamId,
      userId,
    })

    return res.status(200).json({ invitedUserId, ogImageUrl, shortLink })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
