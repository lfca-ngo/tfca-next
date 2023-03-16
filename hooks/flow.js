import { useState } from 'react'

import { ACTION_COMPLETED, STEP } from '../services/analytics'
import { useTrackAction } from '../services/internal/action'
import { scrollToId, setCookie } from '../utils'
import { useAnalytics } from './analytics'
import { useActionStatus } from './app'
import { SERVER_UID } from './user'

export const ACTION_STATES = {
  ACTIVE: 'active',
  IDLE: 'idle',
  SUCCESS: 'success',
}

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ id, initialIndex, initialStore = {}, stepsKeys }) => {
  const [index, set] = useState(initialIndex)
  const [store, setStore] = useState(initialStore)
  const { setActionStatus } = useActionStatus()
  const { trackEvent } = useAnalytics()
  const { mutate: trackAction } = useTrackAction({
    onSuccess: ({ data }) => {
      setCookie(SERVER_UID, data?.userId)
    },
  })

  const updateProgress = (keyIndex) => {
    const progress = keyIndex / (stepsKeys.length - 1)
    // set status for notifications
    const status =
      progress === 0
        ? ACTION_STATES.IDLE
        : progress === 1
        ? ACTION_STATES.SUCCESS
        : ACTION_STATES.ACTIVE
    setActionStatus(`${id}-${status}`)
  }

  const completeAction = () => {
    updateProgress(stepsKeys.length - 1)
    // track completion
    trackEvent({
      name: ACTION_COMPLETED,
      values: { action_id: id },
    })
    // also update the counter in firestore
    trackAction(id)
  }

  const goTo = (page) => {
    // track progress
    const keyIndex = stepsKeys.indexOf(page)
    updateProgress(keyIndex)

    // set the page
    set(page)
    scrollToId(id)
    // track event for every funnel step
    trackEvent({
      name: STEP,
      values: { action_id: id, step: page },
    })
  }

  return {
    completeAction,
    goTo,
    index,
    setStore,
    store,
  }
}
