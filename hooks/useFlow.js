import { useState } from 'react'
import { scroller } from 'react-scroll'

// import useAnalytics from '../hooks/useAnalytics'
import { NAVBAR_HEIGHT_XS } from '../utils'

// helper for managing the flow state of
// the different action modules

export const useFlow = ({ initial, name }) => {
  const [store, setStore] = useState({}) // used to share state between steps
  const [index, set] = useState(initial)
  // const { isMobile } = useIsMobile()
  // const { trackEvent } = useAnalytics()
  let baseScrollOptions = { offset: -NAVBAR_HEIGHT_XS }
  // on mobile devices, we need to
  // scroll on the whole body to
  // prevent additional scrollbars
  // if (!isMobile) {
  //   baseScrollOptions = {
  //     containerId: 'scroll-container',
  //   }
  // }

  const goTo = (page, additionalScrollOptions) => {
    baseScrollOptions = {
      ...baseScrollOptions,
      ...additionalScrollOptions,
    }
    set(page)
    scroller.scrollTo(name, baseScrollOptions)
    // trackEvent(`flow_${page}`)
  }

  return {
    goTo: goTo,
    index: index,
    set: set,
    setStore: setStore,
    store: store,
  }
}
