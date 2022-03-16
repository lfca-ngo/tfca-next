// import axios from 'axios'
// import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { CONSENT_COOKIE, getWindowUid, INTERNAL_COOKIE, isDev } from '../utils'

export const COOKIE = 'userId'

const BASE_API = isDev
  ? process.env.NEXT_PUBLIC_ANALYTICS_API_URL_DEV
  : process.env.NEXT_PUBLIC_ANALYTICS_API_URL

const TRACKING = `apiUtilsTfca`
const COLLECTION_ID = 'events'
// const ANALYTICS = `apiUtilsAnalytics`

// tracking can be manually disabled in development
// by setting TRACKING_DISABLED to true
// const TRACKING_DISABLED = isDev && true

// export const useAnalytics = () => {
//   const [cookies, setReactCookie] = useCookies()
//   const userId = cookies[COOKIE]

//   const trackUser = async () => {
//     const newUserId = await trackUserApi()
//     setReactCookie(COOKIE, newUserId)
//     return newUserId
//   }

//   const trackEvent = async (name, values) => {
//     if (TRACKING_DISABLED) return { status: 200 }

//     if (!userId) {
//       const newUserId = await trackUser()
//       return trackEventApi(newUserId, name, values)
//     } else {
//       return trackEventApi(userId, name, values)
//     }
//   }

//   return { trackEvent }
// }

export const trackEvent = (name, userId, values) => {
  const event = {
    Event: name,
    User_ID: userId,
    ...values,
  }

  const payload = {
    api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
    collection: COLLECTION_ID,
    json: JSON.stringify(event),
    timestamp: Math.floor(new Date().getTime() / 1000),
  }

  axios({
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_GRAPH_JSON_URL}`,
  })
}

export const useTrackEvent = (name, values) => {
  const [cookies] = useCookies()
  const userId = cookies[INTERNAL_COOKIE] || getWindowUid()

  console.log('track', userId)
  useEffect(() => {
    trackEvent(name, userId, values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// DEPRECATED

export const fetchStats = () => {
  const endpoint = `${BASE_API}/${TRACKING}`
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data?.topics?.actions_count)
}

// export const pushStat = (actionName, data) => {
//   const config = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   }
//   const endpoint = `${BASE_API}/${TRACKING}/${actionName}`
//   return axios.post(endpoint, data, config)
// }

// const trackUserApi = async () => {
//   const config = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   }
//   const endpoint = `${BASE_API}/${ANALYTICS}`
//   return axios.post(endpoint, {}, config).then((res) => {
//     if (res.status === 200) return res.data?.userId
//     else return null
//   })
// }

// const trackEventApi = async (userId, name, values) => {
//   const config = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   }
//   const endpoint = `${BASE_API}/${ANALYTICS}/${userId}`
//   return axios.post(endpoint, { data: values, name: name }, config)
// }
