import { getTeamScores } from '../../services/firebase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const teamId = req.query['team']

  try {
    const teamScores = await getTeamScores(teamId)

    res.status(200).json(teamScores)
  } catch (e) {
    throw new Error(e.message || e)
  }
}
