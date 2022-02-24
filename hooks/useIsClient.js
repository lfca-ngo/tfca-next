import { useEffect, useState } from 'react'
import { isMobile as isMobileClient } from 'react-device-detect'

const useIsClient = () => {
  const [isClient, setClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // due to SSG we only know if it's mobile after first client side render
  const key = isClient ? 'client' : 'server'

  useEffect(() => {
    setClient(true)
    setIsMobile(isMobileClient)
  }, [])

  return { isClient, isMobile, key }
}

export default useIsClient
