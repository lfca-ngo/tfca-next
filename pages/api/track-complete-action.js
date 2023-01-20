import { updateActionCountOnReferredUsers } from '../../services/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const { actionId, referredByUserId, userId } = req.body

  // Create short link
  try {
    updateActionCountOnReferredUsers({
      actionId,
      referredByUserId,
      userId,
    })

    res.status(200).json({ actionId, uid })
  } catch (e) {
    throw new Error(e.message || e)
  }
}
