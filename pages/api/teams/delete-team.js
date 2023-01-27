import { deleteTeamById } from '../../../services/firebase'
import { validateAuthToken } from '../../../utils-server-only/validate-auth-token'

// setting the team is done from the lfca member base
// we use a simple token to validate the request

export default async function handler(req, res) {
  try {
    validateAuthToken(req, { requestMethod: 'POST' })

    const { teamId } = req.body

    if (!teamId) return res.status(500).send({ message: 'Missing params' })

    await deleteTeamById({
      teamId,
    })

    return res.status(200).json({ teamId })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
