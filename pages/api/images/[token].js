import path from 'path'
import sharp from 'sharp'

import { createShareSvg, decodeShareToken } from '../../../utils'

/**
 * Resolve fonts so that they are bundled
 * See: https://github.com/lovell/sharp/issues/2499#issuecomment-987643630
 */
path.resolve(process.cwd(), 'fonts', 'fonts.conf')
path.resolve(process.cwd(), 'fonts', 'Manrope-Bold.ttf')
path.resolve(process.cwd(), 'fonts', 'Manrope-ExtraBold.ttf')
path.resolve(process.cwd(), 'fonts', 'Manrope-Regular.ttf')
path.resolve(process.cwd(), 'fonts', 'Manrope-SemiBold.ttf')

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  try {
    const { token } = req.query
    const { actionId, names } = decodeShareToken(token)

    const message = 'I took action for a brighter tomorrow'
    const color = 'green'

    const svgImage = Buffer.from(
      createShareSvg({
        color: colorByName[color],
        message,
        names,
      })
    )

    const png = await sharp(svgImage, { density: 144 })
      .png({ quality: 100 })
      .toBuffer()

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 's-maxage=31536000') // 1 year
    res.send(png)
  } catch (e) {
    res.status(404).send({ error: 'Not found' })
  }
}
