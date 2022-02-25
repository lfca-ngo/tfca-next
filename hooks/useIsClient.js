import React, { useEffect, useState } from 'react'
import { isMobile as isMobileClient } from 'react-device-detect'

const IsMobileContext = React.createContext()

export const IsMobileProvider = ({ children }) => {
  const [isClient, setClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const key = isClient ? 'client' : 'server'

  // due to SSG we only know if it's mobile after first client side render
  useEffect(() => {
    setClient(true)
    setIsMobile(isMobileClient)
  }, [])

  return (
    <IsMobileContext.Provider value={{ isClient, isMobile, key }}>
      {children}
    </IsMobileContext.Provider>
  )
}

export const useIsMobile = () => {
  const { isMobile } = React.useContext(IsMobileContext)
  return isMobile
}
