// import axios from 'axios'
// import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { getWindowUid, INTERNAL_COOKIE } from '../utils'

export const COOKIE = 'userId'

const COLLECTION_ID = 'events'
const LOG = 'log'
const VISUALIZE = 'visualize/data'
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }
const POST = 'post'

const DEFAULT_PAYLOAD = {
  api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
  collection: COLLECTION_ID,
}

export const trackEvent = (name, userId, values) => {
  const event = {
    Event: name,
    User_ID: userId,
    ...values,
  }

  const payload = {
    ...DEFAULT_PAYLOAD,
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
  const userId = cookies[INTERNAL_COOKIE] || getWindowUid()

  useEffect(() => {
    // if a trigger is set do not track the event on mount
    if (withTrigger) return
    trackEvent(name, userId, values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerTrackEvent = ({ name, values }) => {
    trackEvent(name, userId, values)
  }

  return triggerTrackEvent
}

export const fetchStats = () => {
  const payload = {
    ...DEFAULT_PAYLOAD,
    aggregation: 'Count',
    compare: null,
    end: 'now',
    filters: [],
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
      acc[curr.action_id] = curr.Count
      return acc
    }, {})

    return asObject || null
  })
}
