export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const { companyName, email, firstName, lastName } = req.body

  // check if email is valid and required fields are set
  if (!email || !firstName || !lastName || !companyName) {
    return res.status(400).send({ message: 'Missing required fields' })
  }

  const apiUrl = `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`

  // Create short link
  try {
    // use fetch to post to mailchimp
    const response = await fetch(apiUrl, {
      body: JSON.stringify({
        email_address: email,
        merge_fields: {
          COMPANY: companyName,
          FNAME: firstName,
          LNAME: lastName,
        },
        status: 'subscribed',
      }),
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    // handle the error message
    if (!response.ok) {
      response.json().then((error) => {
        return res.status(400).send({ message: error.detail })
      })
    } else {
      return res.status(200).json(response)
    }
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}
