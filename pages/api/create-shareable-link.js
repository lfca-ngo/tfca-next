import { v4 as uuidv4 } from 'uuid'

import { trackInvite } from '../../services/firebase'
import {
  createInviteLink,
  createShareToken,
  DEFAULT_SHARING_IMAGE_URL,
} from '../../utils-server-only'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const {
    actionCollectionSlug = 'int',
    invites = [],
    locale,
    referredByTeamId = null,
    referredByUserId = null,
    senderFirstName,
    senderUserName,
    socialDescription = '',
    socialImage = DEFAULT_SHARING_IMAGE_URL,
    socialTitle = '',
    teamId = null,
    userId,
  } = req.body

  try {
    // iterate over invites and create a share link for each by using promises all
    const shareLinks = await Promise.all(
      // always add one generic invite with no name
      [...invites, { invitedUserName: null }].map(
        async ({ invitedUserName, socialTitle: customSocialTitle }) => {
          // we create the uid for the invited user here
          // this will be set in the client of the user
          // that accepted the invite
          const invitedUserId = uuidv4()

          const token = createShareToken({
            invitedUserId,
            invitedUserName,
            referredByTeamId: teamId, // this is the inviting users teamId, NOT the team that she got invited from
            referredByUserId: userId, // this is the inviting users userId, NOT the userId of the person that she got invited from
            senderName: senderFirstName,
          })

          const shareLink = `${process.env.NEXT_PUBLIC_URL}/${
            locale ? `${locale}/` : ''
          }${actionCollectionSlug}/invite/${token}`
          const ogImageUrl = !invitedUserName
            ? socialImage
            : `${process.env.NEXT_PUBLIC_URL}/api/images/${token}`

          // Create short link
          const shortLink = await createInviteLink(
            shareLink,
            ogImageUrl,
            customSocialTitle || socialTitle,
            socialDescription
          )

          // test firestore
          await trackInvite({
            invitedUserId,
            invitedUserName,
            referredByTeamId,
            referredByUserId,
            senderFirstName: senderFirstName,
            senderUserName: senderUserName || senderFirstName, // fallback to first name
            shortLink,
            teamId,
            userId,
          })

          return {
            invitedUserId,
            invitedUserName,
            ogImageUrl,
            shortLink,
          }
        }
      )
    )

    return res.status(200).json(shareLinks)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
