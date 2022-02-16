import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }

  const payload = req.body
  // TODO: Verify payload
  const token = jwt.sign(payload, process.env.JWT_TOKEN_PRIVATE_KEY)

  res.status(200).json({ token })
}
