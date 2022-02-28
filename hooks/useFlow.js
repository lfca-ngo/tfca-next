import { useState } from 'react'

import { useIsMobile } from '../hooks/useIsClient'
import { NAVBAR_HEIGHT_XS } from '../utils'

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ id, initial }) => {
  const [store, setStore] = useState({})
  const [index, set] = useState(initial)
  const isMobile = useIsMobile()

  const scroll = (id) => {
    console.log('id', id)
    const section = document.querySelector(`#${id}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  let baseScrollOptions = {
    containerId: 'scroll-container',
  }
  if (isMobile) {
    baseScrollOptions.offset = -NAVBAR_HEIGHT_XS
  }

  const goTo = (page, additionalScrollOptions) => {
    baseScrollOptions = {
      ...baseScrollOptions,
      ...additionalScrollOptions,
    }
    set(page)
    scroll(id)
  }

  return {
    goTo: goTo,
    index: index,
    set: set,
    setStore: setStore,
    store: store,
  }
}
