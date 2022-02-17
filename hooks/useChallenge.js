import React, { createContext, useContext, useEffect, useState } from 'react'

export const ChallengeContext = createContext(null)

// Provider to share all challenge specific data
// passed via URL params, and made available to
// all components in the app

export const ChallengeProvider = (props) => {
  const [progress, setProgress] = useState(0)
  const [customization, setCustomization] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(props.location?.search)
    const from = urlParams.get('from')
    const to = urlParams.get('to')
    const isCustom = from && to
    if (isCustom) setCustomization({ from, to })
  }, [props.location?.search])

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
