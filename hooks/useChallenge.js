import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const ChallengeContext = createContext(null)

// Provider to share all challenge specific data
// passed via URL params, and made available to
// all components in the app

export const ChallengeProvider = (props) => {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [customization, setCustomization] = useState(null)

  useEffect(() => {
    const { from, to } = router.query || {}
    const isCustom = from && to
    if (isCustom) setCustomization({ from, to })
  }, [router.query])

  return (
    <ChallengeContext.Provider value={{ customization, progress, setProgress }}>
      {props.children}
    </ChallengeContext.Provider>
  )
}

export const useChallenge = () => {
  const context = useContext(ChallengeContext)
  return context
}
