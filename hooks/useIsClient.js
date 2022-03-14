import React, { useLayoutEffect, useState } from 'react'
import { isMobile as isMobileClient } from 'react-device-detect'

const IsClientContext = React.createContext()

export const IsClientProvider = ({ children }) => {
  const [activeAction, setActiveAction] = useState()
  const [isClient, setClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const key = isClient ? 'client' : 'server'

  // due to SSG we only know if it's mobile after first client side render
  useLayoutEffect(() => {
    setClient(true)
    setIsMobile(isMobileClient)
  }, [])

  return (
    <IsClientContext.Provider
      value={{ activeAction, isClient, isMobile, key, setActiveAction }}
    >
      {children}
    </IsClientContext.Provider>
  )
}

export const useIsMobile = () => {
  const { isMobile } = React.useContext(IsClientContext)
  return isMobile
}

export const useActiveAction = () => {
  const { activeAction, setActiveAction } = React.useContext(IsClientContext)
  return { activeAction, setActiveAction }
}
