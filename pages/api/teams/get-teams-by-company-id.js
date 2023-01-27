import { getTeamsByCompanyId } from '../../../services/firebase'
import { validateAuthToken } from '../../../utils-server-only/validate-auth-token'

export default async function handler(req, res) {
  try {
    validateAuthToken(req, {
      requestMethod: 'GET',
    })

    const companyId = req.query['companyId']

    const teams = await getTeamsByCompanyId(companyId)

    return res.status(200).json(teams)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
