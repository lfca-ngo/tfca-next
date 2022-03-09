import jwt from 'jsonwebtoken'
import path from 'path'
import sharp from 'sharp'

import { createShareSvg } from '../../../utils'

/**
 * Resolve fonts so that they are bundled
 * See: https://github.com/lovell/sharp/issues/2499#issuecomment-987643630
 */
path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'Manrope-Bold.ttf')
path.resolve(process.cwd(), 'fonts', 'Manrope-Regular.ttf')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  try {
    const { token } = req.query
    const payload = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY)

    const svgImage = Buffer.from(
      createShareSvg({
        friendChallenge1: payload.invitee1?.challenge || '',
        friendChallenge2: payload.invitee2?.challenge || '',
        friendChallenge3: payload.invitee3?.challenge || '',
        friendName1: payload.invitee1?.name || '',
        friendName2: payload.invitee2?.name || '',
        friendName3: payload.invitee3?.name || '',
        ownName: payload?.sender.name || 'Me',
      })
    )

    const jpeg = await sharp(svgImage).jpeg().toBuffer()

    res.setHeader('Content-Type', 'image/png')
    // TODO: activate cache headers
    // res.setHeader('Cache-Control', 's-maxage=31536000') // 1 year
    res.send(jpeg)
  } catch (e) {
    res.status(404).send({ error: 'Not found' })
  }
}
