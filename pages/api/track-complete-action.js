import { updateCompletedActions } from '../../services/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const { actionId, userId } = req.body

  // Create short link
  try {
    await updateCompletedActions({
      actionId,
      userId,
    })

    return res.status(200).json({ actionId, userId })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
