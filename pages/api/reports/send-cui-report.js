import mandrill from '@mailchimp/mailchimp_transactional'
import { parse } from 'json2csv'

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.API_ADMIN_TOKEN}`) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const recipients = process.env.CUI_REPORT_RECIPIENTS?.split(',')
  if (!recipients.length) {
    return res.status(500).send({ message: 'No recipients found.' })
  }

  const actionsCsv = parse(
    [
      {
        action_id: 'politics',
        partner_id: 'lfca',
      },
      {
        action_id: 'ecosia',
        partner_id: 'lfca',
      },
    ],
    {
      delimiter: '|',
      quote: '',
    }
  )

  const usersCsv = parse(
    [
      {
        partner_id: 'lfca',
        unique_user_count: 3,
      },
      {
        partner_id: 'lfca',
        unique_user_count: 1,
      },
    ],
    {
      delimiter: '|',
      quote: '',
    }
  )

  const mandrillClient = mandrill(process.env.MANDRILL_API_KEY || '')

  await mandrillClient.messages.send({
    message: {
      attachments: [
        {
          content: Buffer.from(actionsCsv, 'utf8').toString('base64'),
          name: 'actions.csv',
          type: 'text/csv',
        },
        {
          content: Buffer.from(usersCsv, 'utf8').toString('base64'),
          name: 'users.csv',
          type: 'text/csv',
        },
      ],
      from_email: 'info@lfca.earth',
      from_name: 'LFCA',
      subject: 'Montly CUI report',
      to: recipients.map((email) => ({ email })),
    },
  })

  res.status(200).json({
    success: true,
  })
}
