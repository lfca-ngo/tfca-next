import { message } from 'antd'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { PAGE_VISIT, trackEvent } from '../services/analytics'
import { MOBILE_BREAKPOINT, textBlockToString } from '../utils'
import { ACTION_STATES } from './flow'
import { usePrevious } from './usePrevious'

const AppContext = createContext()

export const HAS_WARNED = 'has-warned'
export const getStatusString = (id, status) => `${id}-${status}`

// content is passed during the build process on every page
// therefore the translation provider is fulled on boot up
export const AppProvider = ({ children, content, customization = null }) => {
  const [actionStatus, setActionStatus] = useState(ACTION_STATES.IDLE)
  const [activeAction, setActiveAction] = useState()
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setClient] = useState(false)
  const prevActiveAction = usePrevious(activeAction)
  const { locale, query } = useRouter()

  const statusMessage = textBlockToString(
    content?.metaData?.blocks?.['message.leaving.activeaction']
  )

  const key = isClient ? 'client' : 'server'

  // show a notification when an active action is
  // being left before being completed
  useEffect(() => {
    if (
      actionStatus ===
        getStatusString(prevActiveAction, ACTION_STATES.ACTIVE) &&
      activeAction !== prevActiveAction
    ) {
      message.info({ content: statusMessage, style: { fontSize: '18px' } })
      setActionStatus(getStatusString(activeAction, HAS_WARNED))
    }
  }, [prevActiveAction, actionStatus, activeAction, statusMessage])

  // due to SSG we only know if it's mobile
  // after first client side render
  useEffect(() => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    setClient(true)
    setIsMobile(screenWidth <= MOBILE_BREAKPOINT)

    trackEvent({
      action_collection_slug: query.actionCollectionSlug,
      inviting_uid: customization?.uid,
      locale,
      name: PAGE_VISIT,
    })
  }, [customization, locale, query])

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
      }}
    >
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

export const useActionStatus = () => {
  const context = useContext(AppContext)
  return {
    actionStatus: context?.actionStatus,
    setActionStatus: context?.setActionStatus,
  }
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

export const useContentLists = (key) => {
  const context = useContext(AppContext)
  return context.content?.metaData?.lists[key] || { items: [] }
}

export const useIsMobile = () => {
  const { isMobile } = useContext(AppContext)
  return isMobile
}

export const useIsClient = () => {
  const { isClient } = useContext(AppContext)
  return isClient
}
