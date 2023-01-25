import axios from 'axios'

import { INITIAL_STATS, isBrowser } from '../../utils'

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
  action_collection_slug,
  collection = process.env.NEXT_PUBLIC_GRAPH_JSON_EVENTS_COLLECTION,
  inviting_uid,
  locale,
  name,
  userId,
  values = {},
}) => {
  if (!isBrowser()) return

  const event = {
    action_collection_slug,
    Event: name,
    inviting_uid,
    locale,
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
      acc[curr.action_id] = curr.Count + (INITIAL_STATS[curr.action_id] || 0)
      return acc
    }, {})

    return asObject || null
  })
}

// event names
export const BEFORE_LEAVE_PAGE = 'before_leave'
export const EXTERNAL_LINK_CLICKED = 'external_link_clicked'
export const STEP = 'step'
export const PAGE_VISIT = 'page_visit'
export const ACTION_COMPLETED = 'action_completed'
export const ERROR_BOUNDARY = 'error_boundary'
export const TEXT_RENDERER = 'Text_renderer'
export const SWITCH_ENERGY_SUCCESS = 'switch_energy_success'
