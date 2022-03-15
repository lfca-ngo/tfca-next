import { useState } from 'react'

import { scrollToId } from '../utils'

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ id, initial }) => {
  const [store, setStore] = useState({})
  const [index, set] = useState(initial)

  const goTo = (page) => {
    set(page)
    scrollToId(id)
  }

  return {
    goTo: goTo,
    index: index,
    set: set,
    setStore: setStore,
    store: store,
  }
}
