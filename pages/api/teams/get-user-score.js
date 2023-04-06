import { getUserScore } from '../../../services/firebase'
import { getWeightedUserScore } from '../../../utils-server-only'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const userId = req.query['userId']

  try {
    const { user, userScore } = await getUserScore(userId)

    // weight scores
    const result = {
      user,
      userScore: getWeightedUserScore({ user, userScore }),
    }

    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
