export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.API_ADMIN_TOKEN}`) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  res.status(200).json({
    success: true,
  })
}
