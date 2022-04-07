import { useState } from 'react'

import { STEP, trackEvent } from '../services/analytics'
import { scrollToId } from '../utils'
import { useActionStatus } from './app'

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ id, initialIndex, initialStore = {}, stepsKeys }) => {
  const [index, set] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [store, setStore] = useState(initialStore)
  const { setActionStatus } = useActionStatus()

  const goTo = (page) => {
    // track progress
    const keyIndex = stepsKeys.indexOf(page)
    const progress = keyIndex / (stepsKeys.length - 1)
    setProgress(progress)
    // set status for notificatinos
    const status =
      progress === 0 ? 'idle' : progress === 1 ? 'success' : 'active'
    setActionStatus(`${id}-${status}`)
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
    goTo,
    index,
    progress,
    set,
    setProgress,
    setStore,
    store,
  }
}
