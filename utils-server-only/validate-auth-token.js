export const validateAuthToken = (req, { needsAdminRights, requestMethod }) => {
  const authHeader = req.headers.authorization || ''

  if (req.method !== requestMethod)
    throw new Error(`Only ${requestMethod} requests allowed`)

  if (!authHeader.startsWith('Bearer ')) throw new Error(`Missing auth token`)

  const authToken = authHeader.substring(7, authHeader.length)
  const isValidKey = authToken === process.env.TFCA_BACKEND_TOKEN
  const isValidAdminToken = authToken === process.env.TFCA_BACKEND_ADMIN_TOKEN

  // basic rights
  if (isValidKey && !needsAdminRights) return true
  // admin rights are always valid
  if (isValidAdminToken) return true
  // deny default
  else throw new Error(`Wrong auth token`)
}
