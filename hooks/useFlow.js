import { useState } from 'react'
import { scroller } from 'react-scroll'

import { useIsMobile } from '../hooks/useIsClient'
import { NAVBAR_HEIGHT_XS } from '../utils'

// helper hook for managing the flow state of
// the different action modules
export const useFlow = ({ initial, name }) => {
  const [store, setStore] = useState({})
  const [index, set] = useState(initial)
  const isMobile = useIsMobile()

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
    scroller.scrollTo(name, baseScrollOptions)
  }

  return {
    goTo: goTo,
    index: index,
    set: set,
    setStore: setStore,
    store: store,
  }
}
