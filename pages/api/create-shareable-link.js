import { createShareToken } from '../../utils'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const {
    actionCollectionSlug,
    actionId,
    color,
    message,
    names,
    socialDescription = '',
    socialTitle = '',
    uid,
  } = req.body
  const token = createShareToken({ actionId, color, message, names, uid })

  const shareLink = `${process.env.NEXT_PUBLIC_URL}/${actionCollectionSlug}/invite/${token}`
  const ogImageUrl = `${process.env.NEXT_PUBLIC_URL}/api/images/${token}`

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

    res.status(200).json({ ogImageUrl, shortLink })
  } catch (e) {
    throw new Error(e.message || e)
  }
}
