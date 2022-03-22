import { useState } from 'react'

import { scrollToId } from '../utils'

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ id, initialIndex, initialStore = {} }) => {
  const [index, set] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [store, setStore] = useState(initialStore)

  const goTo = (page) => {
    set(page)
    scrollToId(id)
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
