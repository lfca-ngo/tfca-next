import path from 'path'
import sharp from 'sharp'

import { createShareSvg, decodeShareToken } from '../../../utils-server-only'

/**
 * Resolve fonts so that they are bundled
 * See: https://github.com/lovell/sharp/issues/2499#issuecomment-987643630
 */
path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'Poppins-Bold.ttf')
path.resolve(process.cwd(), 'fonts', 'Poppins-Regular.ttf')
path.resolve(process.cwd(), 'fonts', 'Poppins-SemiBold.ttf')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  try {
    const { token } = req.query
    const { invitedUserName } = decodeShareToken(token)

    const svgImage = Buffer.from(
      createShareSvg({
        invitedUserName,
      })
    )

    const png = await sharp(svgImage, { density: 72 })
      .png({ quality: 100 })
      .toBuffer()

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 's-maxage=31536000') // 1 year
    res.send(png)
  } catch (e) {
    res.status(404).send({ error: 'Not found' })
  }
}
