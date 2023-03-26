import { getUserScore } from '../../../services/firebase'
import { getWeightedUserScore } from '../../../utils-server-only'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const userId = req.query['userId']

  try {
    const score = await getUserScore(userId)

    // weight scores
    const weightedScore = {
      ...score,
      userScore: getWeightedUserScore(score.userScore),
    }

    return res.status(200).json(weightedScore)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
