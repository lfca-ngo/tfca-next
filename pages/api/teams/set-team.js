import { setTeam } from '../../../services/firebase'

// setting the team is done from the lfca member base
// we use a simple token to validate the request

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  // check if the TFCA_BACKEND_KEY matches process env

  const { companyId, teamId, userId } = req.body

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
