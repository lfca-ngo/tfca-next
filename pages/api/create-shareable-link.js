import { v4 as uuidv4 } from 'uuid'

import { trackInvite } from '../../services/firebase'
import { createShareToken } from '../../utils-server-only'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const {
    actionCollectionSlug,
    actionId,
    color,
    locale,
    message,
    name,
    sender,
    socialDescription = '',
    socialImage,
    socialTitle = '',
    teamId,
    uid,
  } = req.body

  // we create the uid for the invited user here
  // this will be set in the client of the user
  // that accepted the invite
  const invitedUserId = uuidv4()

  const token = createShareToken({
    actionId,
    color,
    invitedUserId,
    message,
    name,
    sender,
    teamId,
    uid,
  })

  const shareLink = `${process.env.NEXT_PUBLIC_URL}/${
    locale ? `${locale}/` : ''
  }${actionCollectionSlug}/invite/${token}`
  const ogImageUrl =
    socialImage || `${process.env.NEXT_PUBLIC_URL}/api/images/${token}`

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
      invitedUserName: name,
      shortLink,
      teamId,
      userId: uid,
      userName: sender,
    })

    return res.status(200).json({ invitedUserId, ogImageUrl, shortLink })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
