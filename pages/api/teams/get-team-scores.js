import { getTeamScores } from '../../../services/firebase'
import { getWeightedUserScore } from '../../../utils-server-only'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const teamId = req.query['team']

  try {
    const teamScores = await getTeamScores(teamId)

    // weight scores
    const weightedScores = teamScores.map(({ user, userScore }) => ({
      ...user,
      userScore: getWeightedUserScore({ user, userScore }),
    }))

    return res.status(200).json(weightedScores)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
