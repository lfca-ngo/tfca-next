import { getAllTeams } from '../../../services/firebase'
import { validateAuthToken } from '../../../utils-server-only/validate-auth-token'

export default async function handler(req, res) {
  try {
    validateAuthToken(req, {
      needsAdminRights: true,
      requestMethod: 'GET',
    })

    const teamScores = await getAllTeams()

    return res.status(200).json(teamScores)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
