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

import { PAGE_VISIT, trackEvent } from '../services/analytics'
import { usePrevious } from './usePrevious'

const AppContext = createContext()

// content is passed during the build process on every page
// therefore the translation provider is fulled on boot up
export const AppProvider = ({ children, content, customization = null }) => {
  const [actionStatus, setActionStatus] = useState('idle')
  const [activeAction, setActiveAction] = useState()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setClient] = useState(false)
  const prevActiveAction = usePrevious(activeAction)

  const key = isClient ? 'client' : 'server'

  // show a notification when an active action is interrupted
  useEffect(() => {
    if (
      actionStatus === `${prevActiveAction}-active` &&
      activeAction !== prevActiveAction
    ) {
      message.warning(`Don't forget to complete your action!`)
      setActionStatus(`${activeAction}-has-warned`)
    }
  }, [prevActiveAction, actionStatus, activeAction])

  // due to SSG we only know if it's mobile after first client side render
  useEffect(() => {
    setClient(true)
    setIsMobile(isMobileClient)

    trackEvent({
      name: PAGE_VISIT,
      values: {
        inviting_uid: customization?.uid,
      },
    })
  }, [customization])

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
  return context.content?.metaDataLists?.[key] || { items: [] }
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
