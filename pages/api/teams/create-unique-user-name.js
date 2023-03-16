import { createUniqueUserName } from '../../../services/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const { firstName, teamId, userId } = req.body

  // Create short link
  try {
    const { userName } = await createUniqueUserName({
      firstName,
      teamId,
      userId,
    })

    return res.status(200).json({ userId, userName })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
