/**
 * Use this token for testing:
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmllbmQxIjp7ImNoYWxsZW5nZSI6IkVuZXJneSIsIm5hbWUiOiJUaW1vIn0sImZyaWVuZDIiOnsiY2hhbGxlbmdlIjoiRW5lcmd5IiwibmFtZSI6IkFubmEifSwiZnJpZW5kMyI6eyJjaGFsbGVuZ2UiOiJFbmVyZ3kiLCJuYW1lIjoiU2FyYWgifSwic2VsZiI6eyJjaGFsbGVuZ2UiOiJFb2xpdGljcyIsIm5hbWUiOiJEYXZpZCJ9LCJpYXQiOjE2NDUwMTcyNjF9.bsqW3ZYhAs7qx3vc8l4czrqC2pQ1s93ObbsqdR47jZ0
 */

import jwt from 'jsonwebtoken'
import sharp from 'sharp'

import { createShareSvg } from '../../../utils'

export default async function handler(req, res) {
  try {
    const { token } = req.query
    const payload = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY)

    const svgImage = Buffer.from(
      createShareSvg({
        friendChallenge1: payload.friend1?.challenge || '',
        friendChallenge2: payload.friend2?.challenge || '',
        friendChallenge3: payload.friend3?.challenge || '',
        friendName1: payload.friend1?.name || '',
        friendName2: payload.friend2?.name || '',
        friendName3: payload.friend3?.name || '',
        ownName: payload?.self.name || 'Me',
      })
    )

    const jpeg = await sharp(svgImage).jpeg().toBuffer()

    res.writeHead(200, {
      'Cache-Control': 's-maxage=31536000', // 1 year
      'Content-Type': 'image/jpeg',
    })
    res.end(jpeg)
  } catch (e) {
    res.status(404).send({ error: 'Not found' })
  }
}
