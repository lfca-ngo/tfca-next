import { setTeam } from '../../../services/firebase'

// setting the team is done from the lfca member base
// we use a simple token to validate the request

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const authHeader = req.headers.authorization || ''

  if (!authHeader.startsWith('Bearer '))
    return res.status(500).send({ message: 'Missing auth token' })

  const authToken = authHeader.substring(7, authHeader.length)

  if (
    authToken !==
    (process.env.TFCA_BACKEND_KEY || process.env.TFCA_BACKEND_ADMIN_TOKEN)
  )
    return res.status(500).send({ message: 'Wrong auth token' })

  const { companyId, teamId, userId } = req.body

  if (!companyId || !teamId || !userId)
    return res.status(500).send({ message: 'Missing params' })

  // Create short link
  try {
    await setTeam({
      companyId,
      teamId,
      userId,
    })

    return res.status(200).json({ companyId, teamId, userId })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
