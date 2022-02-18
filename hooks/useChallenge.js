import React, { createContext, useContext, useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export const ChallengeContext = createContext(null)

// Provider to share all challenge specific data
// passed via URL params or share token, and made available to
// all components in the app

export const ChallengeProvider = ({ children, customization = null }) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [progress, setProgress] = useState(0)

  const fireConfetti = () => {
    setShowConfetti(true)
    let timer = setTimeout(() => setShowConfetti(false), 3500)
    return () => clearTimeout(timer)
  }

  return (
    <ChallengeContext.Provider
      value={{ customization, fireConfetti, progress, setProgress }}
    >
      {showConfetti && <Confetti />}
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenge = () => {
  const context = useContext(ChallengeContext)
  return context
}

export const useConfetti = () => {
  const context = useContext(ChallengeContext)
  return context.fireConfetti
}
