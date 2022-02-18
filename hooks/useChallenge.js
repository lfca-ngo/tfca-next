import React, { createContext, useContext, useEffect, useState } from 'react'

export const ChallengeContext = createContext(null)

// Provider to share all challenge specific data
// passed via URL params or share token, and made available to
// all components in the app

export const ChallengeProvider = ({ children, customization = null }) => {
  const [progress, setProgress] = useState(0)

  return (
    <ChallengeContext.Provider value={{ customization, progress, setProgress }}>
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenge = () => {
  const context = useContext(ChallengeContext)
  return context
}
