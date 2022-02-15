// import axios from 'axios'

import { isDev } from '../utils'

export const COOKIE = 'userId'

const BASE_API = isDev
  ? `http://localhost:5001/leaders-for-climate-action/us-central1`
  : 'https://us-central1-leaders-for-climate-action.cloudfunctions.net'

const TRACKING = `apiUtilsTfca`
const REPS = `apiUtilsFindRep`
const ANALYTICS = `apiUtilsAnalytics`

export const pushStat = (actionName, data) => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const endpoint = `${BASE_API}/${TRACKING}/${actionName}`
  // return axios.post(endpoint, data, config)
}

export const trackUser = async () => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const endpoint = `${BASE_API}/${ANALYTICS}`
  // return axios.post(endpoint, {}, config).then((res) => {
  //   if (res.status === 200) return res.data?.userId
  //   else return null
  // })
}

export const trackEvent = async (userId, name, values) => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const endpoint = `${BASE_API}/${ANALYTICS}/${userId}`
  // return axios.post(endpoint, { name: name, data: values }, config)
}

export const fetchReps = (location) => {
  const config = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  let endpoint = `${BASE_API}/${REPS}/`

  // check which country api to query
  const { country } = location

  if (country === 'us') {
    endpoint = endpoint + 'us'
  }

  // return axios.post(endpoint, { location: location }, config)
}
