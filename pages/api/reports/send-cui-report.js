import mandrill from '@mailchimp/mailchimp_transactional'
import axios from 'axios'
import { parse } from 'json2csv'

import { getDateTimeFileSuffix } from '../../../utils-server-only'

const REPORTS = [
  {
    fields: [
      'partner_id',
      'action_level_1',
      'action_completed_count',
      'action_completed_savings',
      'action_completed_date',
      'action_country',
    ],
    filename: 'cui_actions_lfca_in',
    query:
      "WITH completions AS ( SELECT formatDateTime(toDateTime(timestamp, 'Europe/Berlin'), '%Y-%m') AS date, JSONExtractString(json, 'Event') as event_name, JSONExtractString(json, 'action_id') as action_id, CASE JSONExtractString(json, 'action_id') WHEN 'switch_energy' THEN 1648.7 ELSE 0 END as impact, CASE JSONExtractString(json, 'action_collection_slug') WHEN 'usa' THEN 'US' WHEN 'tur' THEN 'TR' WHEN 'deu' THEN 'DE' WHEN 'fra' THEN 'FR' WHEN 'esp' THEN 'ES' WHEN 'gbr' THEN 'UK' WHEN 'int' THEN '' ELSE '??' END as region, JSONExtractBool(json, 'consent') as consent, JSONExtractString(json, 'User_ID') as uid FROM base WHERE event_name = 'action_completed' AND consent = 1 AND region <> '??' ) SELECT 'lfca' as partner_id, CASE action_id WHEN 'climate_activism' THEN 'Voice' WHEN 'ecosia' THEN 'Lifestyle' WHEN 'green_finances' THEN 'Lifestyle' WHEN 'politics' THEN 'Voice' WHEN 'share_deck' THEN 'Lifestyle' WHEN 'switch_energy' THEN 'Home' WHEN 'food' THEN 'Food' ELSE '' END as action_level_1, COUNT(action_id) as action_completed_count, floor(SUM(impact), 2) AS action_completed_savings, CONCAT(date, '-01') as action_completed_date, region as action_country FROM completions WHERE action_completed_date = CONCAT(formatDateTime(subtractMonths(today(), 1), '%Y-%m'), '-01') GROUP BY action_level_1, date, region ORDER BY action_completed_date DESC",
  },
  {
    fields: [
      'partner_id',
      'New_active_user',
      'action_completed_date',
      'Country',
    ],
    filename: 'cui_uniqueusers_lfca_in',
    query:
      "WITH completions AS ( SELECT formatDateTime(toDateTime(timestamp, 'Europe/Berlin'), '%Y-%m') AS date, JSONExtractString(json, 'Event') as event_name, JSONExtractString(json, 'action_id') as action_id, CASE JSONExtractString(json, 'action_collection_slug') WHEN 'usa' THEN 'US' WHEN 'tur' THEN 'TR' WHEN 'deu' THEN 'DE' WHEN 'fra' THEN 'FR' WHEN 'esp' THEN 'ES' WHEN 'gbr' THEN 'UK' WHEN 'int' THEN '' ELSE '??' END as region, JSONExtractBool(json, 'consent') as consent, JSONExtractString(json, 'User_ID') as uid FROM base WHERE event_name = 'action_completed' AND consent = 1 AND region <> '??' ORDER BY date ASC LIMIT 1 BY uid )  SELECT 'lfca' as partner_id, COUNT(DISTINCT uid) as New_active_user, CONCAT(date, '-01') as action_completed_date, region as Country FROM completions WHERE action_completed_date = CONCAT(formatDateTime(subtractMonths(today(), 1), '%Y-%m'), '-01') GROUP BY date, region ORDER BY date DESC",
  },
]

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

  const attachments = []

  // Fetch reports from GraphJSON
  for (const report of REPORTS) {
    const payload = {
      api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
      graph_type: 'Table',
      sql_query: report.query,
    }

    const response = await axios({
      data: payload,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      url: 'https://api.graphjson.com/api/visualize/data',
    })

    const csv = parse(response.data.result, {
      delimiter: '|',
      fields: report.fields,
      quote: '',
    })

    attachments.push({
      content: Buffer.from(csv, 'utf8').toString('base64'),
      name: `${report.filename}_${getDateTimeFileSuffix()}.csv`,
      type: 'text/csv',
    })
  }

  const mandrillClient = mandrill(process.env.MANDRILL_API_KEY || '')

  await mandrillClient.messages.send({
    message: {
      attachments,
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
