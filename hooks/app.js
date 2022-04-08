import { message } from 'antd'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import Confetti from 'react-confetti'
import { isMobile as isMobileClient } from 'react-device-detect'

import { PAGE_VISIT, useTrackEvent } from '../services/analytics'
import { text } from '../utils/Text'
import { usePrevious } from './usePrevious'

const AppContext = createContext()

export const ACTIVE = 'active'
export const IDLE = 'idle'
export const SUCCESS = 'success'
export const HAS_WARNED = 'has-warned'

export const getStatusString = (id, status) => `${id}-${status}`

// content is passed during the build process on every page
// therefore the translation provider is fulled on boot up
export const AppProvider = ({ children, content, customization = null }) => {
  const [actionStatus, setActionStatus] = useState('idle')
  const [activeAction, setActiveAction] = useState()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setClient] = useState(false)
  const prevActiveAction = usePrevious(activeAction)
  const trackEvent = useTrackEvent()

  const statusMessage = text(
    content?.metaData?.blocks?.['message.leaving.activeaction']
  )

  const key = isClient ? 'client' : 'server'

  // show a notification when an active action is
  // being left before being completed
  useEffect(() => {
    if (
      actionStatus === getStatusString(prevActiveAction, ACTIVE) &&
      activeAction !== prevActiveAction
    ) {
      message.info({ content: statusMessage, style: { fontSize: '18px' } })
      setActionStatus(getStatusString(activeAction, HAS_WARNED))
    }
  }, [prevActiveAction, actionStatus, activeAction, statusMessage])

  // due to SSG we only know if it's mobile
  // after first client side render
  useEffect(() => {
    setClient(true)
    setIsMobile(isMobileClient)

    trackEvent({
      name: PAGE_VISIT,
      values: {
        inviting_uid: customization?.uid,
      },
    })
  }, [customization, trackEvent])

  return (
    <AppContext.Provider
      value={{
        actionStatus,
        activeAction,
        content,
        customization,
        isClient,
        isMobile,
        key,
        setActionStatus,
        setActiveAction,
        setShowConfetti,
      }}
    >
      {showConfetti && (
        <div className="confetti-wrapper">
          <Confetti />
        </div>
      )}
      {children}
    </AppContext.Provider>
  )
}

export const useCustomization = () => {
  const context = useContext(AppContext)
  return context.customization
}

export const useActiveAction = () => {
  const { activeAction, setActiveAction } = useContext(AppContext)
  return { activeAction, setActiveAction }
}

export const useContent = () => {
  const context = useContext(AppContext)
  return context.content
}

export const useTopbar = () => {
  const context = useContext(AppContext)
  return context.content?.metaData?.topbar
}

export const useContentBlocks = (key) => {
  const context = useContext(AppContext)
  return context.content?.metaData?.blocks?.[key] || ''
}

export const useContentNavs = (key) => {
  const context = useContext(AppContext)
  return context.content?.navs?.[key] || ''
}

export const useActionStatus = () => {
  const context = useContext(AppContext)
  return {
    actionStatus: context?.actionStatus,
    setActionStatus: context?.setActionStatus,
  }
}

export const useContentLists = (key) => {
  const context = useContext(AppContext)
  return context.content?.metaData?.lists[key] || { items: [] }
}

export const useConfetti = () => {
  const { setShowConfetti } = useContext(AppContext)

  const fireConfetti = useCallback(() => {
    setShowConfetti(true)
    let timer = setTimeout(() => setShowConfetti(false), 3500)
    return () => clearTimeout(timer)
  }, [setShowConfetti])

  useEffect(() => {
    fireConfetti()
  }, [fireConfetti])

  return true
}

export const useIsMobile = () => {
  const { isMobile } = React.useContext(AppContext)
  return isMobile
}

export const useIsClient = () => {
  const { isClient } = React.useContext(AppContext)
  return isClient
}
