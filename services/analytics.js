import axios from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { getWindowUid, INITIAL_STATS, INTERNAL_COOKIE } from '../utils'

export const COOKIE = 'userId'

const DEFAULT_COLLECTION_ID = 'base'
const LOG = 'log'
const VISUALIZE = 'visualize/data'
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }
const POST = 'post'

const DEFAULT_PAYLOAD = {
  api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
}

export const trackEvent = ({
  collection = DEFAULT_COLLECTION_ID,
  name,
  userId,
  values,
}) => {
  const event = {
    Event: name,
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
    headers: DEFAULT_HEADERS,
    method: POST,
    url: `${process.env.NEXT_PUBLIC_GRAPH_JSON_URL}/${LOG}`,
  })
}

export const useTrackEvent = ({ name, values, withTrigger }) => {
  const [cookies] = useCookies()
  const withConsent = Boolean(cookies[INTERNAL_COOKIE])
  const userId = cookies[INTERNAL_COOKIE] || getWindowUid()
  const eventPayload = { consent: withConsent, name, userId, values }

  // if a trigger is set do not track the event on mount
  useEffect(() => {
    if (withTrigger) return
    trackEvent(eventPayload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // custom trigger can add additional scoped values
  const triggerTrackEvent = ({ name, values }) => {
    trackEvent({ ...eventPayload, name, values })
  }

  return triggerTrackEvent
}

export const fetchStats = () => {
  const payload = {
    ...DEFAULT_PAYLOAD,
    aggregation: 'Count',
    collection: DEFAULT_COLLECTION_ID,
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
    headers: DEFAULT_HEADERS,
    method: POST,
    url: `${process.env.NEXT_PUBLIC_GRAPH_JSON_URL}/${VISUALIZE}`,
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
