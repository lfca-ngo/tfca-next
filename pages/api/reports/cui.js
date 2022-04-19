import axios from 'axios'
import { parse } from 'json2csv'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

const OPTIONS_BY_TYPE = {
  actions: {
    filename: 'cui_actions_lfca_in',
    query:
      "WITH completions AS ( SELECT toDate( toStartOfDay(toDateTime(timestamp, 'Europe/Berlin')) ) AS date, JSONExtractString(json, 'Event') as event_name, JSONExtractString(json, 'action_id') as action_id, CASE JSONExtractString(json, 'action_id') WHEN 'switch_energy' THEN 1648.7 ELSE 0 END as impact, CASE JSONExtractString(json, 'action_collection_slug') WHEN 'usa' THEN 'US' WHEN 'tur' THEN 'TR' WHEN 'deu' THEN 'DE' WHEN 'fra' THEN 'FR' WHEN 'esp' THEN 'ES' WHEN 'gbr' THEN 'UK' WHEN 'int' THEN '' ELSE '??' END as region, JSONExtractBool(json, 'consent') as consent, JSONExtractString(json, 'User_ID') as uid FROM base WHERE event_name = 'action_completed' AND consent = 1 AND date > subtractDays(yesterday(), 7) AND date < today() AND region <> '??' ) SELECT 'lfca' as partner_id, action_id, CASE action_id WHEN 'climate_activism' THEN 'Support NGOs' WHEN 'ecosia' THEN 'Digital' WHEN 'green_finances' THEN 'Banking' WHEN 'politics' THEN 'Politics' WHEN 'share_deck' THEN 'Action at work' WHEN 'switch_energy' THEN 'Switch Energy' WHEN 'food' THEN 'Food' ELSE '' END as action_name, 'Co2' as action_benefit, CASE action_id WHEN 'climate_activism' THEN 'Voice' WHEN 'ecosia' THEN 'Lifestyle' WHEN 'green_finances' THEN 'Lifestyle' WHEN 'politics' THEN 'Voice' WHEN 'share_deck' THEN 'Lifestyle' WHEN 'switch_energy' THEN 'Home' WHEN 'food' THEN 'Food' ELSE '' END as action_level_1, CASE action_id WHEN 'climate_activism' THEN 'Collective action' WHEN 'ecosia' THEN 'Digital' WHEN 'green_finances' THEN 'Financial Services' WHEN 'politics' THEN 'Collective action' WHEN 'share_deck' THEN 'Pledges' WHEN 'switch_energy' THEN 'Gas' WHEN 'food' THEN 'Not classified food' ELSE '' END as action_level_2, CASE action_id WHEN 'climate_activism' THEN 'Active citizen' WHEN 'ecosia' THEN 'Efficient usage' WHEN 'green_finances' THEN 'Divestment' WHEN 'politics' THEN 'Direct engagement' WHEN 'share_deck' THEN 'Pledge to Cut Carbon' WHEN 'switch_energy' THEN 'Green gas' WHEN 'food' THEN 'Not classified' ELSE '' END as action_level_3, COUNT(action_id) as action_completed_count_volunteer, floor(SUM(impact), 2) AS action_completed_savings, date as action_completed_date, '' as action_geography, region as action_country, '' as volunteer_type, '' as gender, '' as age_group, '' as parent_organization FROM completions GROUP BY action_id, date, region ORDER BY action_completed_date DESC",
  },
  'unique-users': {
    filename: 'cui_uniqueusers_lfca_in',
    query:
      "WITH completions AS ( SELECT toDate( toStartOfDay(toDateTime(timestamp, 'Europe/Berlin')) ) AS date, JSONExtractString(json, 'Event') as event_name, JSONExtractString(json, 'action_id') as action_id, CASE JSONExtractString(json, 'action_id') WHEN 'switch_energy' THEN 1648.7 ELSE 0 END as impact, CASE JSONExtractString(json, 'action_collection_slug') WHEN 'usa' THEN 'US' WHEN 'tur' THEN 'TR' WHEN 'deu' THEN 'DE' WHEN 'fra' THEN 'FR' WHEN 'esp' THEN 'ES' WHEN 'gbr' THEN 'UK' WHEN 'int' THEN '' ELSE '??' END as region, JSONExtractBool(json, 'consent') as consent, JSONExtractString(json, 'User_ID') as uid FROM base WHERE event_name = 'action_completed' AND consent = 1 AND region <> '??' ORDER BY date ASC LIMIT 1 BY uid, action_id ) SELECT 'lfca' as partner_id, COUNT(DISTINCT uid) as unique_user_count, date as action_completed_date, region as Geography, floor(SUM(impact), 6) AS Total_carbon_Savings, COUNT(action_id) as Total_Number_of_completed_actions FROM completions WHERE date > subtractDays(yesterday(), 7) AND date < today() GROUP BY date, region ORDER BY date DESC",
  },
}

function getDateTimeFileSuffix() {
  const date = new Date()

  return `${date.getFullYear()}_${('0' + (date.getMonth() + 1)).slice(-2)}_${(
    '0' + date.getDate()
  ).slice(-2)}_${('0' + date.getHours()).slice(-2)}_${(
    '0' + date.getMinutes()
  ).slice(-2)}_${('0' + date.getSeconds()).slice(-2)}`
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' })
  }

  const { type } = req.query
  const OPTIONS = OPTIONS_BY_TYPE[type]

  if (!OPTIONS) {
    return res.status(400).send({ message: 'No options exist for type' })
  }

  const payload = {
    api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
    graph_type: 'Table',
    sql_query: OPTIONS.query,
  }

  const response = await axios({
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: 'https://api.graphjson.com/api/visualize/data',
  })

  const csv = parse(response.data.result, {
    delimiter: '|',
    quote: '',
  })

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${OPTIONS.filename}_${getDateTimeFileSuffix()}.csv`
  )
  await pipeline(csv, res)

  res.end('OK')
}
