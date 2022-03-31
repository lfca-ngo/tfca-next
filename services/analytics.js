import axios from 'axios'

import {
  getCookie,
  getWindowUid,
  INITIAL_STATS,
  isBrowser,
  UID_COOKIE_NAME,
} from '../utils'

const DEFAULT_PAYLOAD = {
  api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
}

const PATHS_TO_CUT = ['/invite']

const getCleanPathName = () => {
  const pathname = window?.location.pathname

  for (const p of PATHS_TO_CUT) {
    if (pathname.includes(p)) {
      return pathname.split(p)[0].concat(p)
    }
  }

  return pathname
}

export const trackEvent = ({
  collection = process.env.NEXT_PUBLIC_GRAPH_JSON_EVENTS_COLLECTION,
  name,
  values = {},
}) => {
  if (!isBrowser()) return
  const uidCookie = getCookie(UID_COOKIE_NAME)

  const consent = uidCookie === null ? null : Boolean(uidCookie) // UID cookie will be set with empty '' if no consent is given
  const userId = uidCookie || getWindowUid()

  const event = {
    consent,
    Event: name,
    path: getCleanPathName(),
    User_ID: userId,
    ...values,
  }

  const payload = {
    ...DEFAULT_PAYLOAD,
    collection,
    json: JSON.stringify(event),
    timestamp: Math.floor(new Date().getTime() / 1000),
  }

  axios({
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_GRAPH_JSON_URL}/log`,
  })
}

export const fetchStats = () => {
  const payload = {
    ...DEFAULT_PAYLOAD,
    aggregation: 'Count',
    collection: process.env.NEXT_PUBLIC_GRAPH_JSON_EVENTS_COLLECTION,
    compare: null,
    end: 'now',
    filters: [['Event', '=', 'action_completed']],
    graph_type: 'Table',
    IANA_time_zone: 'Europe/London',
    metric: null,
    split: 'action_id',
    start: '03/14/2022 1:44 pm',
  }

  return axios({
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_GRAPH_JSON_URL}/visualize/data`,
  }).then(({ data }) => {
    const { result } = data

    const asObject = result.reduce((acc, curr) => {
      // adding last year's stats
      acc[curr.action_id] = curr.Count + INITIAL_STATS[curr.action_id]
      return acc
    }, {})

    return asObject || null
  })
}
